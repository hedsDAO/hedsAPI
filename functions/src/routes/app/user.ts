import * as express from "express";
import {
  getUserByWallet,
  createUser,
  updateUser,
  deleteUser,
  getUserSongs,
  getUserLikes,
  getUserEvents,
  getUserListeningHistory,
  addSongToListeningHistory,
  getArtistsAndCurators,
  getManyUsersByWalletId,
  getAllUsers,
} from "../../controllers/app/user";
import * as functions from "firebase-functions";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getAllUsers();
  functions.logger.log("users", users);
  return res.json(users || []);
});

router.get('/manyUsers', async (req, res) => {
  functions.logger.log('inside many-users');
  try {
    const walletIds = req.query?.walletIds?.toString().split(',');
    if (Array.isArray(walletIds)) {
      functions.logger.log('walletIds', walletIds);
      const users = await getManyUsersByWalletId(walletIds);
      functions.logger.log('users', users);
      return res.json(users);
    }
    return res.status(400).send('walletIds must be an array');
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/artists-curators', async (req, res) => {
  try {
    functions.logger.log('GET /artists-curators');
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
    functions.logger.log("user data", userData);
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