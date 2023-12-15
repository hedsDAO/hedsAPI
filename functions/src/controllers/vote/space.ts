import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllSpacesByAdmin(userId: number) {
  return await prisma.spaces.findMany({
    where: {
      space_authors: {
        some: { user_id: userId },
      },
    },
    include: {
      space_authors: true,
    },
  });
}

export async function getSpaces() {
  return await prisma.spaces.findMany();
}

export async function createSpace(space: any) {
  const { name, authors, image, description, banner, twitter, instagram, soundcloud, discord } = space;
  return await prisma.$transaction(async (prisma) => {
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
        discord,
      },
    });

    const authorPromises = authors.map((author_id: number) => {
      return prisma.space_authors.create({
        data: {
          user_id: author_id,
          space_id: space.id,
        },
      });
    });
    await Promise.all(authorPromises);

    return space;
  });
}

export async function updateSpace(updatedSpace: any) {
  const { name, authors, image, description, banner, twitter, instagram, soundcloud, discord } = updatedSpace;

  const space = await prisma.spaces.findUnique({ where: { name }, include: { space_authors: true } });

  if (!space) return 'Space not found';

  const existingAuthorIds = space.space_authors.map((author) => author.user_id);
  const newAuthorIds = authors.map((author_id: number) => author_id);

  const authorsToAdd = newAuthorIds.filter((id: number) => !existingAuthorIds.includes(id));
  const authorsToDelete = existingAuthorIds.filter((id) => !newAuthorIds.includes(id));
  const filteredAuthorsToDelete: number[] = authorsToDelete.filter((id): id is number => id !== null);

  await prisma.space_authors.deleteMany({
    where: {
      user_id: { in: filteredAuthorsToDelete },
      space_id: space.id,
    },
  });

  const authorPromises = authorsToAdd.map((author_id: number) => {
    return prisma.space_authors.create({
      data: {
        user_id: author_id,
        space_id: space.id,
      },
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
      discord,
    },
  });

  await Promise.all(authorPromises);

  return await prisma.spaces.findUnique({ where: { id: space.id }, include: { space_authors: true } });
}

export async function deleteSpace(name: string) {
  const space = await prisma.spaces.findUnique({ where: { name } });

  if (!space) return 'Space not found';
  return await prisma.spaces.delete({ where: { id: space.id } });
}

export async function getProposalsInSpace(name: string) {
  const space = await prisma.spaces.findUnique({ where: { name } });

  if (!space) return 'Space not found';
  return await prisma.proposals.findMany({
    where: { space_id: space.id },
  });
}
