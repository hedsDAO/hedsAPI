import { Router } from 'express';
import { getEventComments, getCommentById, createEventComment, updateEventComment, deleteEventComment } from '../controllers/eventComments';

const router = Router();

router.get('/events/:eventId/comments', async (req, res) => {
  try {
    const comments = await getEventComments(req.params.eventId);
    if (comments) {
      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ message: 'No comments found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/comments/:id', async (req, res) => {
  try {
    const comment = await getCommentById(req.params.id);
    if (comment) {
      return res.status(200).json(comment);
    } else {
      return res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/events/:eventId/comments', async (req, res) => {
  try {
    const comment = await createEventComment(req.params.eventId, req.body);
    if (comment) {
      return res.status(201).json(comment);
    } else {
      return res.status(400).json({ message: 'Comment could not be created' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/comments/:id', async (req, res) => {
  try {
    const comment = await updateEventComment(req.params.id, req.body);
    if (comment) {
      return res.status(200).json(comment);
    } else {
      return res.status(400).json({ message: 'Comment could not be updated' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/comments/:id', async (req, res) => {
  try {
    const isDeleted = await deleteEventComment(req.params.id);
    if (isDeleted) {
      return res.status(200).json({ message: 'Comment deleted' });
    } else {
      return res.status(400).json({ message: 'Comment could not be deleted' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
