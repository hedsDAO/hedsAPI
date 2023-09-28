import axios from "axios";
import { Request, Response } from "express";
import * as functions from "firebase-functions";
import { Strategy, StrategyName, Erc721MultiRegistryWeightedStrategy, WhitelistWeightedStrategy } from "hedsvote";
import { PrismaClient } from '@prisma/client';

interface TypedRequestBody<T> extends Request {
    body: T;
}

const prisma = new PrismaClient();
let cursor = "";

/**
 * Fetch owners of the specified contract address.
 * 
 * @param {string} contractAddress - Ethereum contract address.
 * @returns {Promise<any>} A promise object that resolves to the response from moralis API.
 */
export const fetchOwners = async (contractAddress: string) => {
  const url = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/owners?chain=eth&format=decimal&limit=100`;
  const options = { headers: { "accept": "application/json", "X-API-Key": process.env.WEB3_API_KEY ? process.env.WEB3_API_KEY : "test", }};
  const response = await (await axios.get(`${url}${cursor ? `&cursor=${cursor}` : ""}`, options)).data;
  cursor = response.cursor;
  functions.logger.log("response", response);
  return response;
}

/**
 * Retrieve owners of a specified contract address.
 * 
 * @param {string} contractAddress - Ethereum contract address.
 * @returns {Promise<any[]>} A promise object that resolves to an array of owners.
 */
export const getOwners = async (contractAddress: string) => {
  const response = await fetchOwners(contractAddress);
  const owners = (await includeNextNPages(response, 4, contractAddress)).result;
  functions.logger.log("owners", owners);
  return owners;
}

/**
 * Include next N pages of owners from the Moralis API response.
 * 
 * @param {any} previous - Previous page response.
 * @param {number} numPages - Number of pages to include.
 * @param {string} contractAddress - Ethereum contract address.
 * @returns {Promise<any>} A promise object that resolves to combined response of owners.
 */
export const includeNextNPages = async (previous: any, numPages: number, contractAddress: string) => {
  const result = previous.result || [];
  functions.logger.log("result", result);
  let response = previous;
  if (!cursor) {
    response.result = result;
    return response;
  }

  for (let i = 0; i < numPages; i++) {
    response = await fetchOwners(contractAddress);
    if (response.result.length < 0) break;
    if (response.result.length < 100) {
      result.push(...response.result);
      break;
    }
    result.push(...response.result);
  }

  response.result = result;
  return response;
}

/**
 * Handle request to get token owners and save strategies to the database.
 * 
 * @param {TypedRequestBody<{ strategies: Strategy[], proposalId: string }>} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} A promise that resolves to an express response object.
 */
export const getTokenOwners = async (req: TypedRequestBody<{ strategies: Strategy[], proposalId: string }>, res: Response) => {
  const { strategies, proposalId } = req.body;
  const contracts = strategies.map((strategy: Strategy) => {
    if (strategy.name === StrategyName.ERC721) {
      const erc721Strategy = strategy as Erc721MultiRegistryWeightedStrategy;
      return erc721Strategy.params.tokens;
    }
    return [];
  }).flat();

  const contractOwners = [];
  for (const contract of contracts) {
    try {
      const ownersObjectByContract = await getOwners(contract);
      functions.logger.log("ownersObjectByContract", ownersObjectByContract);
      const ownersByContract = ownersObjectByContract.map((ownerObject: any) => ({ owner: ownerObject.owner_of, symbol: ownerObject.symbol, amount: ownerObject.amount }));
      contractOwners.push(ownersByContract);
    } catch (e) {
      functions.logger.log(e);
      return res.json(e);
    }
  }

  functions.logger.log("final", contractOwners.flat());
  const sortedContractOwners: { [key: string]: any } = {};
  for (let i = 0; i < contractOwners.length; i++) {
    sortedContractOwners[i] = contractOwners[i];
  }

  for (const strategy of strategies) {
    if (strategy.name === StrategyName.ERC721) {
      (strategy as Erc721MultiRegistryWeightedStrategy).params.owners = sortedContractOwners;
    }
  }

  try {
    await addStrategiesToDB(strategies, proposalId);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error inserting strategies into the database" });
  }
  return res.status(200).json({ message: "Successfully inserted strategies into the database" });
};

/**
 * Add voting strategies to the database.
 * 
 * @param {Strategy[]} strategies - Array of voting strategies.
 * @param {string} proposalId - Proposal identifier.
 * @returns {Promise<void>} A promise that resolves when strategies are added to the database.
 */
export const addStrategiesToDB = async (strategies: Strategy[], proposalId: string) => {
  for (const strategy of strategies) {
    let params;
    if (strategy.name === StrategyName.ERC721) {
      const erc721Strategy = strategy as Erc721MultiRegistryWeightedStrategy;
      params = erc721Strategy.params;
    } else if (strategy.name === StrategyName.WHITELIST) {
      const whitelistStrategy = strategy as WhitelistWeightedStrategy;
      params = { addresses: whitelistStrategy.params.addresses };
    } else {
      params = null;
    }

    await prisma.strategies.create({
      data: {
        proposal_id: proposalId,
        name: strategy.name as StrategyName,
        params: JSON.stringify(params),
        network: parseInt(strategy.network)
      }
    });
  }
};
