import * as express from 'express';
import * as functions from 'firebase-functions';
import { toCamelCase } from '../../common';
import {
  getSongByAudio,
  //   createSong,
  deleteSong,
  getLikesBySongId,
  likeSong,
  unlikeSong,
  getManySongs,
  getLatestTrackSong,
} from '../../controllers/app/songs';
const router = express.Router();

/**
 * Retrieves multiple songs based on an array of song hashes.
 * @route GET /many-songs
 * @returns {Object} 200 - An array of requested songs
 * @returns {Error} 500 - Unexpected error
 */
router.get('/many-songs', async (req, res) => {
  try {
    functions.logger.log(req.query?.songHashes, 'GET /many-songs');
    const songHashes = req.query?.songHashes?.toString().split(',');
    functions.logger.log(songHashes, 'songHashes');
    if (Array.isArray(songHashes)) {
      const requestedSongs = await getManySongs(songHashes);
      if (!requestedSongs) res.status(404).json({ error: 'Songs not found' });
      const convertedSongs = requestedSongs?.map((song) => {
        const convertedSong = toCamelCase(song);
        return convertedSong;
      });
      functions.logger.log("convertedSong", convertedSongs);
      res.json(convertedSongs);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Retrieves the latest song.
 * @route GET /latest
 * @returns {Object} 200 - The latest song
 * @returns {Error} 404 - Track not found
 * @returns {Error} 500 - Unexpected error
 */
router.get('/latest', async (req, res) => {
  try {
    const latestSong = await getLatestTrackSong();
    if (latestSong) {
      const convertedSong = toCamelCase(latestSong);
      functions.logger.log("convertedSong", convertedSong);
      res.status(200).json(convertedSong);
    } else {
      res.status(404).send('No latest track song found');
    }
  } catch (error: any) {
    // Log the error for server-side debugging
    console.error(error);

    // Respond with an appropriate error message and status code
    res.status(500).send('An error occurred while retrieving the latest song');
  }
});

/**
 * Retrieves a song by audio hash.
 * @route GET /:audio
 * @param {string} - IPFS hash of the song's audio file
 * @returns {Object} 200 - The song object
 * @returns {Error} 404 - Song not found
 * @returns {Error} 500 - Unexpected error
 */
router.get('/:audio', async (req, res) => {
  try {
    const ipfsPrefix = 'https://www.heds.cloud/ipfs/';
    const audio: string = req.params.audio;
    const song = await getSongByAudio(ipfsPrefix + audio);
    if (!song) {
      return res.status(404).send('Song not found');
    } else {
      functions.logger.log("song", song);
      const convertedSong = toCamelCase(song);
      functions.logger.log("convertedSong", convertedSong);
      return res.json(convertedSong);
    };
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

/**
 * Creates a new song.
 * @route POST /
 * @param {Object} - Contains tempAudioRef, user_id, tape_id, and duration of the new song
 * @returns {Object} 200 - The created song object
 * @returns {Error} 400 - Missing required fields
 * @returns {Error} 404 - Error creating song
 * @returns {Error} 500 - Unexpected error
 */
// router.post('/', async (req, res) => {
//   functions.logger.log('POST /songs');
//   functions.logger.log(req.body, 'req.body');
//   try {
//     const { tempAudioRef, user_id, tape_id, duration } = req.body;
//     if (!tempAudioRef || !user_id || !tape_id || !duration) {
//       functions.logger.log('Missing required fields');
//       return res.status(400).send('Missing required fields');
//     } else {
//       const { newSubmission } = await createSong({ tempAudioRef, user_id, tape_id, duration });
//       if (newSubmission) return res.json({ newSubmission });
//       else {
//         functions.logger.log('Error creating song');
//         return res.status(404).send('Error creating song');
//       }
//     }
//   } catch (error: any) {
//     functions.logger.log('Error in POST /songs');
//     return res.status(500).send(error.message);
//   }
// });

/**
 * Deletes a song by its ID.
 * @route DELETE /:song_id
 * @param {number} - ID of the song to delete
 * @returns {Object} 200 - Result of the deletion operation
 * @returns {Error} 500 - Unexpected error
 */
router.delete('/:songId', async (req, res) => {
  try {
    const song_id = parseInt(req.params.songId);
    const result = await deleteSong(song_id);
    if (!result) res.status(404).send('Song not found');
    else res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Retrieves likes of a song by its ID.
 * @route GET /:song_id/likes
 * @param {number} - ID of the song
 * @returns {Object} 200 - An array of likes associated with the song ID
 * @returns {Error} 500 - Unexpected error
 */
router.get('/:songId/likes', async (req, res) => {
  try {
    const song_id = parseInt(req.params.songId);
    const likes = await getLikesBySongId(song_id);
    if (!likes) res.status(404).send('Likes not found');
    else {
      const convertedLikes = likes.map((like) => {
        const convertedLike = toCamelCase(like);
        return convertedLike;
      });
      res.json(convertedLikes);
    }
    res.json(likes);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Likes a song.
 * @route POST /:song_id/likes
 * @param {number} - ID of the song to like
 * @param {number} - ID of the user liking the song
 * @returns {string} 201 - Confirmation message of successful like operation
 * @returns {Error} 500 - Unexpected error
 */
router.post('/:songId/:userId/likes', async (req, res) => {
  try {
    const song_id = parseInt(req.params.songId);
    const user_id = parseInt(req.params.userId);
    const likedSucces = await likeSong(song_id, user_id);
    if (!likedSucces) res.status(404).send('Song not found');
    else res.status(201).send('Song liked successfully');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Unlikes a song.
 * @route DELETE /:song_id/likes
 * @param {number} - ID of the song to unlike
 * @param {number} - ID of the user unliking the song
 * @returns {string} 200 - Confirmation message of successful unlike operation
 * @returns {Error} 500 - Unexpected error
 */
router.delete('/:songId/:userId/likes', async (req, res) => {
  try {
    const song_id = parseInt(req.params.songId);
    const user_id = parseInt(req.params.userId);
    const likedSucces = await unlikeSong(song_id, user_id);
    if (!likedSucces) res.status(404).send('Song not found');
    else res.status(201).send('Song liked successfully');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
