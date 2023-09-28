import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getAllSpacesByAdmin(req: Request, res: Response) {
  const user_id = parseInt(req.params.userId);

  try {
      const spaces = await prisma.spaces.findMany({
          where: {
              space_authors: {
                  some: { user_id }
              }
          },
          include: {
              space_authors: true
          }
      });

      if (!spaces || spaces.length === 0) {
          return res.status(404).json({error: `No spaces found for user with user id ${user_id}`});
      }

      return res.json(spaces);
  } catch (error) {
      console.error(error);
      return res.status(500).json({error: `Error fetching spaces for user id ${user_id}`});
  }
}


  export async function getSpaces(req: Request, res: Response) {
    try {
      const spaces = await prisma.spaces.findMany();
      res.json(spaces);
    } catch (error) {
      res.status(500).json({error: "Error fetching spaces"});
    }
  }
  
  export async function createSpace(req: Request, res: Response) {
    const { name, authors, image, description, banner, twitter, instagram, soundcloud, discord } = req.body;
    try {
      const createdSpace = await prisma.$transaction(async (prisma) => {
        const space = await prisma.spaces.create({
          data: {
            name,
            created_at: Date.now(),
            image,
            description,
            banner,
            twitter,
            instagram,
            soundcloud,
            discord
          }
        });
  
        const authorPromises = authors.map((author_id: number) => {
          return prisma.space_authors.create({
            data: {
              user_id: author_id,
              space_id: space.id
            }
          });
        });
        await Promise.all(authorPromises);
  
        return space;
      });
  
      return res.status(201).json(createdSpace);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error creating space" });
    }
  }
  

  export async function updateSpace(req: Request, res: Response) {
    const {name, authors, image, description, banner, twitter, instagram, soundcloud, discord} = req.body;
  
    const space = await prisma.spaces.findUnique({ where: { name }, include: { space_authors: true } });
  
    if (!space) return res.status(404).json({error: "Space not found"});
  
    try {
      const existingAuthorIds = space.space_authors.map(author => author.user_id);
      const newAuthorIds = authors.map((author_id: number) => author_id);
  
      const authorsToAdd = newAuthorIds.filter((id: number) => !existingAuthorIds.includes(id));
      const authorsToDelete = existingAuthorIds.filter(id => !newAuthorIds.includes(id));
  
      await prisma.space_authors.deleteMany({
        where: {
          user_id: { in: authorsToDelete },
          space_id: space.id
        }
      });
  
      const authorPromises = authorsToAdd.map((author_id: number) => {
        return prisma.space_authors.create({
          data: {
            user_id: author_id,
            space_id: space.id
          }
        });
      });
  
      await prisma.spaces.update({
        where: { id: space.id },
        data: {
          name,
          image,
          description,
          banner,
          twitter,
          instagram,
          soundcloud,
          discord
        }
      });
  
      await Promise.all(authorPromises);
  
      const updatedSpace = await prisma.spaces.findUnique({ where: { id: space.id }, include: { space_authors: true } });
      return res.json(updatedSpace);
    } catch (error) {
      return res.status(500).json({error: "Error updating space"});
    }
  }
  

  export async function deleteSpace(req: Request, res: Response) {
    const name = req.params.spaceName;
  
    const space = await prisma.spaces.findUnique({ where: { name } });
  
    if (!space) return res.status(404).json({error: "Space not found"});
  
    try {
      await prisma.spaces.delete({ where: { id: space.id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({error: "Error deleting space"});
    }
  }

  export async function getProposalsInSpace(req: Request, res: Response) {
    const name = req.params.spaceName;
  
    const space = await prisma.spaces.findUnique({ where: { name } });
  
    if (!space) return res.status(404).json({error: "Space not found"});
    try {
      const proposals = await prisma.proposals.findMany({
        where: { space_id: space.id }
      });
      return res.json(proposals);
    } catch (error) {
      return res.status(500).json({data: [], error: "Error fetching proposals in space"});
    }
  }
  