import { Router } from 'express';
import {
  getEventRSVPs,
  getRSVPById,
  createRSVP,
  updateRSVP,
  deleteRSVP,
  getEventWaitlist,
  getWaitlistById,
  addToWaitlist,
  removeFromWaitlist,
} from '../controllers/guestStatus';

const router = Router();

// RSVP routes
router.get('/events/:eventId/rsvps', getEventRSVPs);
router.get('/rsvps/:id', getRSVPById);
router.post('/events/:eventId/rsvps', createRSVP);
router.put('/rsvps/:id', updateRSVP);
router.delete('/rsvps/:id', deleteRSVP);

// Waitlist routes
router.get('/events/:eventId/waitlists', getEventWaitlist);
router.get('/waitlists/:id', getWaitlistById);
router.post('/events/:eventId/waitlists', addToWaitlist);
router.delete('/waitlists/:id', removeFromWaitlist);

export default router;
