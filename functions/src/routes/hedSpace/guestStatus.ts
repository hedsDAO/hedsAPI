import { Router } from 'express';
import { createRSVP, updateRSVP, deleteRSVP, addToWaitlist, removeFromWaitlist } from '../controllers/guestStatus';

const router = Router();

router.post('/events/:eventId/rsvps', async (req, res) => {
  try {
    const rsvp = await createRSVP(req.params.eventId, req.body);
    if (rsvp) {
      return res.status(201).json(rsvp);
    } else {
      return res.status(400).json({ message: 'RSVP could not be created' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/rsvps/:id', async (req, res) => {
  try {
    const rsvp = await updateRSVP(req.params.id, req.body);
    if (rsvp) {
      return res.status(200).json(rsvp);
    } else {
      return res.status(400).json({ message: 'RSVP could not be updated' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/rsvps/:id', async (req, res) => {
  try {
    const isDeleted = await deleteRSVP(req.params.id);
    if (isDeleted) {
      return res.status(200).json({ message: 'RSVP deleted' });
    } else {
      return res.status(400).json({ message: 'RSVP could not be deleted' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Waitlist routes
router.post('/events/:eventId/waitlists', async (req, res) => {
  try {
    const waitlist = await addToWaitlist(req.params.eventId, req.body);
    if (waitlist) {
      return res.status(201).json(waitlist);
    } else {
      return res.status(400).json({ message: 'Could not add guest to waitlist' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/waitlists/:id', async (req, res) => {
  try {
    const isRemoved = await removeFromWaitlist(req.params.id);
    if (isRemoved) {
      return res.status(200).json({ message: 'Guest removed from waitlist' });
    } else {
      return res.status(400).json({ message: 'Could not remove guest from waitlist' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
