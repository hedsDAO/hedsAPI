import * as express from 'express';
import { getSongByAudio, createSong, deleteSong, getSongsByAudio } from '../controllers/songs';
const router = express.Router();

router.get('/:audio', async (req, res) => {
  try {
    const ipfsPrefix = 'https://www.heds.cloud/ipfs/';
    const audio: string = req.params.audio;
    const song = await getSongByAudio(ipfsPrefix + audio);
    if (!song) {
      return res.status(404).send('Song not found');
    } else return res.json(song);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.post('/audio_ids', async (req, res) => {
  try {
    const ipfsPrefix = 'https://www.heds.cloud/ipfs/';
    const audioIds: string[] = req.body?.audioIds?.map((id: string) => ipfsPrefix + id);
    const songs = await getSongsByAudio(audioIds);
    if (!songs) {
      return res.status(404).send('Songs not found');
    } else return res.json(songs);
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

export default router;
