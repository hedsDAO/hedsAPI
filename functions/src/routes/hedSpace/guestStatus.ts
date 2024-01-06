import { Router } from 'express';
import { toCamelCase } from '../../common';
import { createRSVP, updateRSVP, deleteRSVP, addToWaitlist, removeFromWaitlist, findRSVPByEventIdAndUserId } from '../../controllers/hedSpace/guestStatus';

const router = Router();

router.post('/events/:eventId/rsvps', async (req, res) => {
  try {
    const { userId, status } = req.body;

    const existingRSVP = await findRSVPByEventIdAndUserId(parseInt(req.params.eventId), userId);
    if (existingRSVP) {
      const convertedRsvp = toCamelCase(existingRSVP);
      return res.json(convertedRsvp);
    }

    const rsvp = await createRSVP(parseInt(req.params.eventId), userId, status);
    if (rsvp) {
      const convertedRSVP = toCamelCase(rsvp);
      return res.status(201).json(convertedRSVP);
    } else {
      return res.status(400).json({ message: 'RSVP could not be created' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/rsvps/:id', async (req, res) => {
  try {
    const rsvp = await updateRSVP(parseInt(req.params.id), req.body.status);
    if (rsvp) {
      const convertedRSVP = toCamelCase(rsvp);
      return res.status(200).json(convertedRSVP);
    } else {
      return res.status(400).json({ message: 'RSVP could not be updated' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/rsvps/:id', async (req, res) => {
  try {
    const isDeleted = await deleteRSVP(parseInt(req.params.id));
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
router.post('/events/:eventId/waitlist', async (req, res) => {
  try {
    const { userId, position } = req.body;
    //Make sure FE sends new position (AKA currrent max position + 1)
    const waitlist = await addToWaitlist(parseInt(req.params.eventId), userId, position);
    if (waitlist) {
      const convertedWaitlist = toCamelCase(waitlist);
      return res.status(201).json(convertedWaitlist);
    } else {
      return res.status(400).json({ message: 'Could not add guest to waitlist' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/waitlist/:id', async (req, res) => {
  try {
    const isRemoved = await removeFromWaitlist(parseInt(req.params.id));
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
