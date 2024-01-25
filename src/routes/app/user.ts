import * as express from 'express';
import {
  getUserByWallet,
  getUserByEmaill,
  getUserByPhoneNumber,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserSongs,
  getUserLikes,
  getUserListeningHistory,
  addSongToListeningHistory,
  getArtistsAndCurators,
  getManyUsersByUserId,
  getAllUsers,
} from '../../controllers/app/user';
import * as functions from 'firebase-functions';
import { isNotNull, toCamelCase, toSnakeCase } from '../../common';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  functions.logger.log('users', users);
  return res.json(users || []);
});

router.get('/manyUsers', async (req, res) => {
  functions.logger.log('inside many-users');
  try {
    const userIds = req.query?.walletIds
      ?.toString()
      .split(',')
      .map((userId) => parseInt(userId));
    if (Array.isArray(userIds)) {
      functions.logger.log('userIds', userIds);
      const users = await getManyUsersByUserId(userIds);
      functions.logger.log('users', users);
      if (!users) return res.status(404).json({ error: 'Users not found' });
      else {
        const convertedUsers = users.map((user) => {
          return toCamelCase(user);
        });
        return res.json(convertedUsers);
        }
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
    if (!result) return res.status(404).json({ error: 'Users not found' });
    else {
        const convertedArtists = result.artists.map((user) => {
          return toCamelCase(user);
        });
        const convertedCurators = result.curators.filter(isNotNull).map((user) => {
            return toCamelCase(user);
        });
        return res.json({ artists: convertedArtists, curators: convertedCurators });
      }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/wallet/:wallet', async (req, res) => {
  try {
    const wallet = req.params.wallet;
    functions.logger.log('route-wallet', wallet);
    const user = await getUserByWallet(wallet);
    if (!user) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedUser = toCamelCase(user);
      return res.json(convertedUser);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/id/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedUser = toCamelCase(user);
      return res.json(convertedUser);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmaill(email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedUser = toCamelCase(user);
      return res.json(convertedUser);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/phone/:phoneNumber', async (req, res) => {
  try {
    const phone_number = req.params.phoneNumber;
    const user = await getUserByPhoneNumber(phone_number);
    if (!user) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedUser = toCamelCase(user);
      return res.json(convertedUser);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = toSnakeCase(req.body);
    functions.logger.log('user data', userData);
    const newUser = await createUser(userData);
    if (!newUser) return res.status(404).json({ error: 'User not created' });
    else {
      const convertedUser = toCamelCase(newUser);
      return res.json(convertedUser);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.post('/:userId/listening-history', async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId);
    const song_id = req.body.songId;
    const result = await addSongToListeningHistory(user_id, song_id);
    if (!result) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedUser = toCamelCase(result);
      return res.json(convertedUser);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId);
    const userData = toSnakeCase(req.body);
    const updatedUser = await updateUser(user_id, userData);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedUser = toCamelCase(updatedUser);
      return res.json(convertedUser);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId);
    const result = await deleteUser(user_id);
    if (!result) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedUser = toCamelCase(result);
      return res.json(convertedUser);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/:userId/songs', async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId);
    const songs = await getUserSongs(user_id);
    if (!songs) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedSongs = songs.map((song) => {
        return toCamelCase(song);
      });
      return res.json(convertedSongs);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/:userId/likes', async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId);
    const likes = await getUserLikes(user_id);
    if (!likes) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedLikes = likes.map((like) => {
        return toCamelCase(like);
      });
      return res.json(convertedLikes);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.get('/:userId/listening-history', async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId);
    const listeningHistory = await getUserListeningHistory(user_id);
    if (!listeningHistory) return res.status(404).json({ error: 'User not found' });
    else {
      const convertedListeningHistory = listeningHistory.map((listening) => {
        return toCamelCase(listening);
      });
      return res.json(convertedListeningHistory);
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

export default router;
