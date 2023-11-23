import { Router } from 'express';
import { getEventComments, getCommentById, createEventComment, updateEventComment, deleteEventComment } from '../controllers/eventComments';

const router = Router();

router.get('/events/:eventId/comments', getEventComments);
router.get('/comments/:id', getCommentById);
router.post('/events/:eventId/comments', createEventComment);
router.put('/comments/:id', updateEventComment);
router.delete('/comments/:id', deleteEventComment);

export default router;
