import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Validates the uniqueness of a display name by querying the database to check if it already exists.
 * 
 * @async
 * @function
 * @param {string} displayName - The display name to validate
 * @returns {Promise<boolean>} - A promise that resolves to false if the display name is unique; true otherwise.
 * @throws Will throw an error if the database query operation fails
 */
export const validateUserByDisplayName = async (displayName: string): Promise<boolean> => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        display_name: displayName.toLowerCase(),
      },
      select: {
        id: true,
      }
    });

    return user ? true : false;
  } catch (error: any) {
    throw new Error(`Failed to validate display name: ${error.message}`);
  }
};
