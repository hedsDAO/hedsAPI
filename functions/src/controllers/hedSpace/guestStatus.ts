import { PrismaClient } from '@prisma/client';
import type { event_rsvps as RSVP, event_waitlists as Waitlist } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retrieves all RSVPs for a given event.
 * @param {number} eventId - The ID of the event.
 * @returns {Promise<RSVP[]>} A promise that resolves to an array of RSVPs.
 */
export const getEventRSVPs = async (eventId: number): Promise<RSVP[]> => {
  return await prisma.event_rsvps.findMany({
    where: { event_id: eventId },
  });
};

/**
 * Retrieves a specific RSVP by its ID.
 * @param {number} id - The ID of the RSVP.
 * @returns {Promise<RSVP|null>} A promise that resolves to the RSVP object, or null if not found.
 */
export const getRSVPById = async (id: number): Promise<RSVP | null> => {
  return await prisma.event_rsvps.findUnique({
    where: { id },
  });
};

/**
 * Creates a new RSVP for an event.
 * @param {number} eventId - The ID of the event.
 * @param {number} userId - The ID of the user who is RSVPing.
 * @param {string} status - The RSVP status.
 * @returns {Promise<RSVP>} A promise that resolves to the created RSVP object.
 */
export const createRSVP = async (eventId: number, userId: number, status: string): Promise<RSVP> => {
  return await prisma.event_rsvps.create({
    data: {
      event_id: eventId,
      user_id: userId,
      status,
    },
  });
};

/**
 * Updates the RSVP status for a given RSVP ID.
 * @param {number} id - The ID of the RSVP to update.
 * @param {string} status - The new status of the RSVP.
 * @returns {Promise<RSVP>} A promise that resolves to the updated RSVP object.
 */
export const updateRSVP = async (id: number, status: string): Promise<RSVP> => {
  return await prisma.event_rsvps.update({
    where: { id },
    data: { status },
  });
};

/**
 * Deletes an RSVP by its ID and also removes the user from the waitlist if they are on it.
 * @param {number} id - The ID of the RSVP to delete.
 * @returns {Promise<any>} A promise that resolves to the result of the deletion operation.
 */
 export const deleteRSVP = async (id: number): Promise<any> => {
  // Start a transaction
  return await prisma.$transaction(async () => {
    // Retrieve the RSVP to get event_id and user_id
    const rsvp = await prisma.event_rsvps.findUnique({
      where: { id },
      select: { event_id: true, user_id: true }
    });

    if (!rsvp) throw new Error('RSVP not found');

    // Delete the RSVP
    await prisma.event_rsvps.delete({
      where: { id },
    });

    // Check if the user is on the waitlist for the same event
    const waitlistEntry = await prisma.event_waitlists.findFirst({
      where: {
        event_id: rsvp.event_id,
        user_id: rsvp.user_id,
      },
    });

    // If they are on the waitlist, remove them
    if (waitlistEntry) {
      await prisma.event_waitlists.delete({
        where: { id: waitlistEntry.id },
      });
    }

    // Return some result or confirmation
    return { message: 'RSVP and waitlist entry (if any) deleted successfully' };
  });
};

/**
 * Retrieves the waitlist for a given event, ordered by position.
 * @param {number} eventId - The ID of the event.
 * @returns {Promise<Waitlist[]>} A promise that resolves to an array of waitlist entries.
 */
export const getEventWaitlist = async (eventId: number): Promise<Waitlist[]> => {
  return await prisma.event_waitlists.findMany({
    where: { event_id: eventId },
    orderBy: { position: 'asc' },
  });
};

/**
 * Adds a user to the waitlist for an event.
 * @param {number} eventId - The ID of the event.
 * @param {number} userId - The ID of the user to add to the waitlist.
 * @param {number} position - The position in the waitlist.
 * @returns {Promise<Waitlist>} A promise that resolves to the created waitlist entry.
 */
export const addToWaitlist = async (eventId: number, userId: number, position: number): Promise<Waitlist> => {
  return await prisma.event_waitlists.create({
    data: {
      event_id: eventId,
      user_id: userId,
      position,
    },
  });
};

/**
 * Removes a user from the waitlist by the waitlist entry ID.
 * @param {number} id - The ID of the waitlist entry to delete.
 * @returns {Promise<any>} A promise that resolves to the result of the deletion operation.
 */
export const removeFromWaitlist = async (id: number): Promise<any> => {
  return await prisma.event_waitlists.delete({
    where: { id },
  });
};
