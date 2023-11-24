import { PrismaClient } from '@prisma/client';
import type { event_comments as Comment } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retrieves all comments for a specific event.
 * @param {number} eventId - The ID of the event for which comments are to be retrieved.
 * @returns {Promise<any[]>} A promise that resolves to an array of comment objects.
 */
export const getEventComments = async (eventId: number): Promise<Comment[]> => {
  return await prisma.event_comments.findMany({
    where: { event_id: eventId },
    orderBy: { created_at: 'desc' },
  });
};

/**
 * Retrieves a single comment by its ID.
 * @param {number} id - The ID of the comment to retrieve.
 * @returns {Promise<Comment|null>} A promise that resolves to the comment object, or null if not found.
 */
export const getCommentById = async (id: number): Promise<Comment | null> => {
  return await prisma.event_comments.findUnique({
    where: { id },
  });
};

/**
 * Creates a new comment for an event.
 * @param {number} eventId - The ID of the event to which the comment belongs.
 * @param {number} userId - The ID of the user making the comment.
 * @param {string} comment - The content of the comment.
 * @returns {Promise<Comment>} A promise that resolves to the created comment object.
 */
export const createEventComment = async (eventId: number, userId: number, comment: string): Promise<Comment> => {
  return await prisma.event_comments.create({
    data: {
      event_id: eventId,
      user_id: userId,
      comment,
    },
  });
};

/**
 * Updates an existing comment by its ID.
 * @param {number} id - The ID of the comment to update.
 * @param {string} comment - The new content of the comment.
 * @returns {Promise<Comment>} A promise that resolves to the updated comment object.
 */
export const updateEventComment = async (id: number, comment: string): Promise<Comment> => {
  return await prisma.event_comments.update({
    where: { id },
    data: { comment },
  });
};

/**
 * Deletes a comment by its ID.
 * @param {number} id - The ID of the comment to delete.
 * @returns {Promise<any>} A promise that resolves to the result of the deletion.
 */
export const deleteEventComment = async (id: number): Promise<any> => {
  return await prisma.event_comments.delete({
    where: { id },
  });
};
