import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verifyWalletSignature } from "../utils/verifySignature";
import { checkSpaceAuthorization } from "../utils/checkSpaceAuthroization";

const prisma = new PrismaClient();

export async function getAllSpacesByAdmin(req: Request, res: Response) {
    const walletId = req.params.walletId;
    try {
      const spaces = await prisma.space.findMany({
        where: {
          authors: {
            has: walletId
          }
        }
      });
      res.json(spaces);
    } catch (error) {
      res.status(500).json({error: `Error fetching spaces for ${walletId}`});
    }
  }

  export async function getSpaces(req: Request, res: Response) {
    try {
      const spaces = await prisma.space.findMany();
      res.json(spaces);
    } catch (error) {
      res.status(500).json({error: "Error fetching spaces"});
    }
  }
  
  export async function createSpace(req: Request, res: Response) {
    const {name, authors, message, signature} = req.body;
    try {
      const recoveredAddress = await verifyWalletSignature(message, signature);
      if (!authors.includes(recoveredAddress)) {
        return res.status(403).json({error: "User is not authorized to update this space"});
      }
      const space = await prisma.space.create({
        data: {
          name,
          authors,
          createdAt: new Date(),
          image: req.body.image,
          description: req.body.description,
          banner: req.body.banner,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          soundcloud: req.body.soundcloud,
          discord: req.body.discord
        }
      });
      return res.status(201).json(space);
    } catch (error) {
      return res.status(500).json({error: "Error creating space"});
    }
  }

  export async function updateSpace(req: Request, res: Response) {
    const {name, authors, image, description, banner, twitter, instagram, soundcloud, discord, message, signature} = req.body;
  
    const space = await prisma.space.findUnique({ where: { name } });
  
    if (!space) return res.status(404).json({error: "Space not found"});
  
    try {
      const recoveredAddress = await verifyWalletSignature(message, signature);
      const isAuthorized = await checkSpaceAuthorization(prisma, name, recoveredAddress);
      if (!isAuthorized) {
        return res.status(403).json({error: "User is not authorized to update this space"});
      }
  
      const updatedSpace = await prisma.space.update({
        where: { id: space.id },
        data: {
          name,
          authors,
          image,
          description,
          banner,
          twitter,
          instagram,
          soundcloud,
          discord
        }
      });
      return res.json(updatedSpace);
    } catch (error) {
      return res.status(500).json({error: "Error updating space"});
    }
  }

  export async function deleteSpace(req: Request, res: Response) {
    const name = req.params.spaceName;
    const message = req.query.message as string;
    const signature = req.query.signature as `0x${string}`;
  
    const space = await prisma.space.findUnique({ where: { name } });
  
    if (!space) return res.status(404).json({error: "Space not found"});
  
    try {
      const recoveredAddress = await verifyWalletSignature(message, signature);
      const isAuthorized = await checkSpaceAuthorization(prisma, name, recoveredAddress);
  
      if (!isAuthorized) {
        return res.status(403).json({error: "User is not authorized to delete this space"});
      }
  
      await prisma.space.delete({ where: { id: space.id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({error: "Error deleting space"});
    }
  }

  export async function getProposalsInSpace(req: Request, res: Response) {
    const name = req.params.spaceName;
  
    const space = await prisma.space.findUnique({ where: { name } });
  
    if (!space) return res.status(404).json({error: "Space not found"});
    try {
      const proposals = await prisma.proposal.findMany({
        where: { spaceId: space.id }
      });
      return res.json(proposals);
    } catch (error) {
      return res.status(500).json({data: [], error: "Error fetching proposals in space"});
    }
  }
  