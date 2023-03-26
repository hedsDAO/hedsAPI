import * as express from 'express';
import { getSongByAudio, createSong, deleteSong } from '../controllers/songs';

const router = express.Router();

router.get('/:audio', async (req, res) => {
  try {
    const audio = req.params.audio;
    const song = await getSongByAudio(audio);
    res.json(song);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const songData = req.body.songData;
    const user_id = parseInt(req.body.user_id);
    const newSong = await createSong(songData, user_id);
    res.status(201).json(newSong);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete('/:song_id', async (req, res) => {
  try {
    const song_id = parseInt(req.params.song_id);
    const result = await deleteSong(song_id);
    res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
