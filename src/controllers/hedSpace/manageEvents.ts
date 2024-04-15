import { PrismaClient } from '@prisma/client';
import type { events as Event } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retrieves all events from the database.
 * @returns {Promise<Event[]>} A promise that resolves to an array of event objects.
 */
export const getEvents = async (): Promise<Event[]> => {
  return await prisma.events.findMany({
    include: {
      event_comments: true,
      event_rsvps: true,
      event_waitlists: true,
    },
  });
};

/**
 * Retrieves a single event by its ID.
 * @param {number} id - The ID of the event to retrieve.
 * @returns {Promise<EventExtended|null>} A promise that resolves to the event object with comments, rsvps, and waitlist, or null if not found.
 */
export const getEventById = async (id: number): Promise<Event|null> => {
  return await prisma.events.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          event_rsvps: true,
        }},
      event_comments: true,
      event_rsvps: {
        include: {
          users: true,
      }},
      event_waitlists: true,
    },
  });
};

/**
 * Retrieves a single event by its event name.
 * @param {string} eventName - The event name of the event to retrieve.
 * @returns {Promise<EventExtended|null>} A promise that resolves to the event object with comments, rsvps, and waitlist, or null if not found.
 */
export const getEventsByEventName = async (eventName: string): Promise<Event|null> => {
  return await prisma.events.findUnique({
    where: { name: eventName},
    include: {
      _count: {
        select: {
          event_rsvps: true,
        }},
      event_comments: true,
      event_rsvps: {
        include: {
          users: true,
      }},
      event_waitlists: true,
    },
  });
};

/**
 * Creates a new event with the given data.
 * @param {Event} eventData - An object containing the event data.
 * @returns {Promise<Event>} A promise that resolves to the created event object.
 */
export const createEvent = async (eventData: Event): Promise<Event> => {
  return await prisma.events.create({
    data: eventData,
  });
};

/**
 * Updates an event with the given ID and data.
 * @param {number} id - The ID of the event to update.
 * @param {Event} eventData - An object containing the new event data.
 * @returns {Promise<Event>} A promise that resolves to the updated event object.
 */
export const updateEvent = async (id: number, eventData: Event): Promise<Event> => {
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
export const deleteEvent = async (id: number): Promise<any> => {
  return await prisma.events.delete({
    where: { id },
  });
};
