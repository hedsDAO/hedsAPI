import * as express from 'express';
import { addLike, removeLike, getLikesBySongId, getLikesByUserId } from '../controllers/likes';
const router = express.Router();

router.post('/addLike', async (req, res) => {
  try {
    const { userId, songId } = req.body;
    console.log(userId, songId)
    await addLike(userId, songId);
    return res.status(201).json({ message: 'Song liked' });
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
});

router.delete('/removeLike', async (req, res) => {
try {
  const { userId, songId } = req.body;
  await removeLike(userId, songId);
  return res.json({ message: 'Song unliked' });
} catch (error: any) {
  return res.status(500).send(error.message)
}
});

router.get('/:song_id/likes', async (req, res) => {
    try {
      const song_id = parseInt(req.params.song_id);
      const likes = await getLikesBySongId(song_id);
      return res.json(likes);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  });

  router.get('/:user_id/likes', async (req, res) => {
    try {
      const user_id = parseInt(req.params.user_id);
      const likes = await getLikesByUserId(user_id);
      return res.json(likes);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  });

export default router;
