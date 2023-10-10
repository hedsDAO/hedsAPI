import { PrismaClient } from "@prisma/client";

/**
 * Checks if the recovered address is authorized to perform actions in the specified space.
 * @param {PrismaClient} prisma - The Prisma client instance.
 * @param {string} name - The name of the space to check authorization for.
 * @param {string} recoveredAddress - The recovered address of the signer.
 * @return {Promise<boolean>} True if the user is authorized, false otherwise.
 */
export async function checkSpaceAuthorization(prisma: PrismaClient, name: string, recoveredAddress: string): Promise<boolean> {
    try {
        const user = await prisma.users.findUnique({ 
            where: { wallet: recoveredAddress }, 
            select: { id: true }
        });
        
        if (!user) return false;
        
        const spaceWithAuthors = await prisma.spaces.findUnique({
            where: { name },
            select: {
                space_authors: {
                    where: {
                        user_id: user.id
                    },
                    select: {
                        user_id: true 
                    }
                }
            }
        });
        
        return spaceWithAuthors ? spaceWithAuthors?.space_authors.length > 0 || false : false;
    } catch (error: any) {
        console.error(`Failed to check space authorization: ${error.message}`);
        throw new Error(error); 
    }
}
