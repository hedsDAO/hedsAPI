import axios from "axios";
import { NextFunction, Request, Response } from "express";
import * as functions from "firebase-functions";
import { Strategy, StrategyName, Erc721MultiRegistryWeightedStrategy, WhitelistWeightedStrategy } from "hedsvote";
import { PrismaClient } from '@prisma/client';

interface TypedRequestBody<T> extends Request {
    body: T;
}

const prisma = new PrismaClient();
let cursor = "";

export async function fetchOwners(contractAddress: string) {
  const url = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/owners?chain=eth&format=decimal&limit=100`;
  const options = { headers: { "accept": "application/json", "X-API-Key": process.env.WEB3_API_KEY ? process.env.WEB3_API_KEY : "test", }};
  const response = await (await axios.get(`${url}${cursor ? `&cursor=${cursor}` : ""}`, options)).data;
  cursor = response.cursor;
  functions.logger.log("response", response);
  return response;
}

export async function getOwners(contractAddress: string) {
  const response = await fetchOwners(contractAddress);
  const owners = (await includeNextNPages(response, 4, contractAddress)).result;
  functions.logger.log("owners", owners);
  return owners;
}

export async function includeNextNPages(previous: any, numPages: number, contractAddress: string) {
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

export const getTokenOwners = async (req: TypedRequestBody<{ strategies: Strategy[], proposalId: string, spaceId: string }>, res: Response, next: NextFunction) => {
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

const addStrategiesToDB = async (strategies: Strategy[], proposalId: string) => {
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

    await prisma.strategy.create({
      data: {
        proposal_id: proposalId,
        name: strategy.name as StrategyName,
        params: params,
        network: parseInt(strategy.network)
      }
    });
  }
};
