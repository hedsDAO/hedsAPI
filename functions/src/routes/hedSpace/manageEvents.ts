import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../../controllers/hedSpace/manageEvents';

const router = Router();

router.get('/events', async (req, res) => { 
  try {
    const events = await getEvents;
    if (events) {
      return res.status(200).json(events);
    } else {
      return res.status(404).json({ message: 'No events found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/events/:id', async (req, res) => {
  try {
    const event = await getEventById(parseInt(req.params.id));
    if (event) {
      return res.status(200).json(event);
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/events', async (req, res) => {
  try {
    const event = await createEvent(req.body);
    if (event) {
      return res.status(201).json(event);
    } else {
      return res.status(400).json({ message: 'Event could not be created' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/events/:id', async (req, res) => {
  try {
    const event = await updateEvent(parseInt(req.params.id), req.body);
    if (event) {
      return res.status(200).json(event);
    } else {
      return res.status(400).json({ message: 'Event could not be updated' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    const isDeleted = await deleteEvent(parseInt(req.params.id));
    if (isDeleted) {
      return res.status(200).json({ message: 'Event deleted' });
    } else {
      return res.status(400).json({ message: 'Event could not be deleted' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
