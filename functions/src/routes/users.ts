import * as express from 'express';
import { getUserByWallet, createUser, updateUser, deleteUser, getUserSongs, getUserLikes, getUserEvents, getUserListeningHistory, addSongToListeningHistory, getArtistsAndCurators } from '../controllers/users';

const router = express.Router();

router.get('/artists-curators', async (req, res) => {
  try {
    const result = await getArtistsAndCurators();
    return res.json(result);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/:wallet', async (req, res) => {
  try {
    const wallet = req.params.wallet;
    const user = await getUserByWallet(wallet);
    return res.json(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.post('/:user_id/listening-history', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const { song_id } = req.body;
    const result = await addSongToListeningHistory(user_id, song_id);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.put('/:user_id', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const userData = req.body;
    const updatedUser = await updateUser(user_id, userData);
    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.delete('/:user_id', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const result = await deleteUser(user_id);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/:user_id/songs', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const songs = await getUserSongs(user_id);
    return res.json(songs);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/:user_id/likes', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const likes = await getUserLikes(user_id);
    res.json(likes);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.get('/:user_id/listening-history', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const listeningHistory = await getUserListeningHistory(user_id);
    res.json(listeningHistory);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.get('/:user_id/events', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const events = await getUserEvents(user_id);
    res.json(events);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});


export default router;
