import { Router } from 'express';
import { toCamelCase } from '../../common';
import {
  getEventComments,
  getCommentById,
  createEventComment,
  updateEventComment,
  addLikeToEventComment,
  removeLikeFromEventComment,
  deleteEventComment,
} from '../../controllers/hedSpace/eventComments';
import type { event_comments as Comment } from '@prisma/client';


const router = Router();

router.get('/events/:eventId/comments', async (req, res) => {
  try {
    const comments = await getEventComments(parseInt(req.params.eventId));
    if (comments) {
      const convertedComments = comments.map((comment) => {
        const convertedComment = toCamelCase(comment);
        return convertedComment;
      });
      return res.status(200).json(convertedComments);
    } else {
      return res.status(404).json({ message: 'No comments found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/comments/:id', async (req, res) => {
  try {
    const comment: Comment | null = await getCommentById(parseInt(req.params.id));
    if (comment) {
      const convertedComment = toCamelCase(comment);
      return res.status(200).json(convertedComment);
    } else {
      return res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/events/:eventId/comments', async (req, res) => {
  try {
    const { userId, userComment } = req.body;
    const createdComment = await createEventComment(parseInt(req.params.eventId), userId, userComment);
    if (createdComment) {
      const convertedComment = toCamelCase(createdComment);
      return res.status(201).json(convertedComment);
    } else {
      return res.status(400).json({ message: 'Comment could not be created' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/comments/:id', async (req, res) => {
  try {
    const comment = await updateEventComment(parseInt(req.params.id), req.body.comment);
    if (comment) {
      const convertedComment = toCamelCase(comment);
      return res.status(200).json(convertedComment);
    } else {
      return res.status(400).json({ message: 'Comment could not be updated' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/comments/addLike', async (req, res) => {
  try {
    const { userId, eventId, commentId } = req.body;
    const updatedComment = await addLikeToEventComment(userId, commentId);
    if (updatedComment) {
      const updatedComments = await getEventComments(eventId);
      const convertedComments = toCamelCase(updatedComments);
      return res.status(200).json(convertedComments);
    } else {
      return res.status(400).json({ message: 'Could not add like to comment' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/comments/removeLike', async (req, res) => {
  try {
    const { commentLikeId, eventId } = req.body;
    const updatedComment = await removeLikeFromEventComment(commentLikeId);
    if (updatedComment) {
      const updatedComments = await getEventComments(eventId);
      const convertedComments = toCamelCase(updatedComments);
      return res.status(200).json(convertedComments);
    } else {
      return res.status(400).json({ message: 'Could not remove like from comment' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/comments/:id', async (req, res) => {
  try {
    const isDeleted = await deleteEventComment(parseInt(req.params.id));
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
