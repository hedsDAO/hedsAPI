import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retrieves all events from the database.
 * @returns {Promise<any[]>} A promise that resolves to an array of event objects.
 */
export const getEvents = async () => {
  return await prisma.events.findMany();
};

/**
 * Retrieves a single event by its ID.
 * @param {number} id - The ID of the event to retrieve.
 * @returns {Promise<any|null>} A promise that resolves to the event object, or null if not found.
 */
export const getEventById = async (id: number) => {
  return await prisma.events.findUnique({
    where: { id },
    include: {
      event_comments: true,
      event_rsvps: true,
      event_waitlists: true,
    },
  });
};

/**
 * Creates a new event with the given data.
 * @param {any} eventData - An object containing the event data.
 * @returns {Promise<any>} A promise that resolves to the created event object.
 */
export const createEvent = async (eventData: any) => {
  return await prisma.events.create({
    data: eventData,
  });
};

/**
 * Updates an event with the given ID and data.
 * @param {number} id - The ID of the event to update.
 * @param {any} eventData - An object containing the new event data.
 * @returns {Promise<any>} A promise that resolves to the updated event object.
 */
export const updateEvent = async (id: number, eventData: any) => {
  return await prisma.events.update({
    where: { id },
    data: eventData,
  });
};

/**
 * Deletes an event with the given ID.
 * @param {number} id - The ID of the event to delete.
 * @returns {Promise<any>} A promise that resolves to the result of the deletion operation.
 */
export const deleteEvent = async (id: number) => {
  return await prisma.events.delete({
    where: { id },
  });
};
