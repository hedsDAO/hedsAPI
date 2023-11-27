import { Router } from 'express';
import * as functions from 'firebase-functions';
import { toCamelCase, toSnakeCase } from '../../common';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../../controllers/hedSpace/manageEvents';

const router = Router();

router.get('/events', async (req, res) => {
  try {
    const events = await getEvents();
    if (events) {
      const convertedEvents = events.map((event) => {
        const convertedEvent = toCamelCase(event);
        return convertedEvent;
      });
      return res.status(200).json(convertedEvents);
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
      const convertedEvent = toCamelCase(event);
      return res.status(200).json(convertedEvent);
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/events', async (req, res) => {
  try {
    const eventData = toSnakeCase(req.body);
    functions.logger.log('eventData', eventData);
    const event = await createEvent(eventData);
    if (event) {
      const convertedEvent = toCamelCase(event);
      return res.status(201).json(convertedEvent);
    } else {
      return res.status(400).json({ message: 'Event could not be created' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/events/:id', async (req, res) => {
  try {
    const eventData = toSnakeCase(req.body);
    const event = await updateEvent(parseInt(req.params.id), eventData);
    if (event) {
      const convertedEvent = toCamelCase(event);
      return res.status(200).json(convertedEvent);
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
