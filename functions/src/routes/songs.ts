import * as express from 'express';
import { getSongByAudio, createSong, deleteSong, getLikesBySongId, likeSong, unlikeSong } from '../controllers/songs';

const router = express.Router();

router.get('/:audio', async (req, res) => {
  try {
    const audio = req.params.audio;
    const song = await getSongByAudio(audio);
    if (!song) {
      return res.status(404).send('Song not found');
    } else return res.json(song);
  } catch (error: any) {
    return res.status(500).send(error.message);
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

router.get('/:song_id/likes', async (req, res) => {
  try {
    const song_id = parseInt(req.params.song_id);
    const likes = await getLikesBySongId(song_id);
    res.json(likes);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post('/:song_id/likes', async (req, res) => {
  try {
    const songId = parseInt(req.params.song_id);
    const userId = parseInt(req.body.user_id);
    await likeSong(songId, userId);
    res.status(201).send('Song liked successfully');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete('/:song_id/likes', async (req, res) => {
  try {
    const songId = parseInt(req.params.song_id);
    const userId = parseInt(req.body.user_id);
    await unlikeSong(songId, userId);
    res.status(200).send('Song unliked successfully');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
