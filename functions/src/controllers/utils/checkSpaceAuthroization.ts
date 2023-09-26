import { PrismaClient } from "@prisma/client";
/**
   * Checks if the recovered address is authorized to perform actions in the specified space.
   * @param {PrismaClient} prisma - The Prisma client instance.
   * @param {string} name - The name of the space to check authorization for.
   * @param {string} recoveredAddress - The recovered address of the signer.
   * @return {Promise<boolean>} True if the user is authorized, false otherwise.
   */
 export async function checkSpaceAuthorization(prisma: PrismaClient, name: string, recoveredAddress: string): Promise<boolean> {
    const space = await prisma.space.findUnique({ where: { name } });
    if (!space) return false;
    return space.authors.includes(recoveredAddress);
}
