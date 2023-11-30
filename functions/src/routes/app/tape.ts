import { Router, Request, Response, NextFunction } from 'express';
import {
  getTapeById,
  // saveTapeAndSampleSong,
  updateTape,
  deleteTape,
  getTapeSongs,
  getAllTapes,
  getTapeContractArgs,
  countArtistTracks,
} from '../../controllers/app/tape';
import * as functions from 'firebase-functions';
import {
  // pinFileToIpfs,
  unpinFromIpfs,
} from '../../controllers/utils/pinata';
import { toCamelCase, toSnakeCase } from '../../common';
import { TapeData } from '../../controllers/tapes/types';

const router = Router();

/**
 * @typedef {Object} RequestWithFile
 * @property {any} files - Files attached to the request.
 */
export interface RequestWithFile extends Request {
  files?: any;
}

/**
 * Gets the count of tapes for each artist.
 * @route GET /get-artists-tape-count
 * @returns {Object} 200 - Count of tapes by artist
 * @returns {Error} 500 - Unexpected error
 */
router.get('/get-artists-tape-count', async (req, res) => {
  try {
    const results = await countArtistTracks();
    if (!results) res.status(404).json({ error: 'No tapes found' });
    else {
      res.json({results});
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * Retrieves contract arguments for tapes.
 * @route GET /get-collection-args
 * @returns {Object} 200 - An array of tape contract arguments
 * @returns {Error} 500 - Unexpected error
 */
router.get('/get-collection-args', async (req, res) => {
  try {
    const results = await getTapeContractArgs();
    if (!results) res.status(404).json({ error: 'No tapes found' });
    else {
      const convertedResults = results.map((result: object) => {
        const convertedResult = toCamelCase(result);
        return convertedResult;
      });
      res.json(convertedResults);
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * Gets all tapes information.
 * @route GET /
 * @returns {Object} 200 - An array of tapes information
 * @returns {Error} 500 - Unexpected error
 */
router.get('/', async (req, res) => {
  try {
    functions.logger.log('GET /tapes');
    const tapesInfo = await getAllTapes();
    if (!tapesInfo) res.status(404).json({ error: 'No tapes found' });
    else {
      const convertedTapesInfo = tapesInfo.map((tapeInfo: object) => {
        const convertedTapeInfo = toCamelCase(tapeInfo);
        return convertedTapeInfo;
      });
      res.json(convertedTapesInfo);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Retrieves tape and associated songs by tape ID.
 * @route GET /{tape_id}
 * @param {number} - Tape ID
 * @returns {Object} 200 - Tape information along with associated songs
 * @returns {Error} 500 - Unexpected error
 */
router.get('/:tapeId', async (req, res) => {
  try {
    functions.logger.log('GET /tapes/:tapeId', req.params.tapeId);
    const tape_id = parseInt(req.params.tapeId);
    const tape = await getTapeById(tape_id);
    functions.logger.log('tape', tape);
    const songs = await getTapeSongs(tape_id);
    functions.logger.log('songs', songs);
    if (!tape) res.status(404).json({ error: 'No tape found' });
    else {
      const convertedTape = toCamelCase(tape);
      functions.logger.log('convertedTape', convertedTape);
      const convertedSongs = songs.map((song: object) => {
        const convertedSong = toCamelCase(song);
        return convertedSong;
      });
      res.json({ ...convertedTape, songs: convertedSongs });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Retrieves songs associated with a given tape ID.
 * @route GET /{tape_id}/songs
 * @param {number} - Tape ID
 * @returns {Object} 200 - An array of songs associated with the tape ID
 * @returns {Error} 500 - Unexpected error
 */
router.get('/:tapeId/songs', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tapeId);
    const songs = await getTapeSongs(tape_id);
    if (!songs) res.status(404).json({ error: 'No songs found' });
    else {
      const convertedSongs = songs.map((song: object) => {
        const convertedSong = toCamelCase(song);
        return convertedSong;
      });
      res.json(convertedSongs);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// /**
//  * Creates a new tape along with a sample song, requires admin privileges.
//  * @route POST /
//  * @param {Object} - Tape and song data
//  * @returns {Object} 201 - The created tape information
//  * @returns {Error} 403 - Forbidden for non-admin users
//  * @returns {Error} 500 - Unexpected error
//  */
// router.post(
//   '/',
//   async (req, res, next) => {
//     const user = req.body.user;

//     if (user.role !== 'admin') {
//       return res.status(403).send('User is not an admin');
//     }

//     try {
//       const imageObject = await pinFileToIpfs(req.body.coverImage, req.body.tapeData.name);
//       const audioObject = await pinFileToIpfs(req.body.sampleAudio, req.body.songData.track_name);
//       res.locals['coverImageIpfsHash'] = imageObject.IpfsHash;
//       res.locals['sampleAudioIpfsHash'] = audioObject.IpfsHash;
//       return next();
//     } catch (e) {
//       functions.logger.log('error', e);
//       return next(e);
//     }
//   },
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const curatorWallet = req.body.user.wallet;
//       const gateway = 'https://www.heds.cloud/ipfs/';
//       const tapeData = req.body.tapeData;
//       tapeData.image = gateway + res.locals['coverImageIpfsHash'];
//       const songData = req.body.songData;
//       songData.audio = gateway + res.locals['sampleAudioIpfsHash'];
//       songData.cover = tapeData.image;
//       const newTape = await saveTapeAndSampleSong(tapeData, songData, curatorWallet);

//       res.status(201).json(newTape);
//     } catch (error: any) {
//       next(error);
//       res.status(500).json(error.message);
//     }
//   },
// );

/**
 * Updates a tape by tape ID.
 * @route PUT /{tape_id}
 * @group tapes - Operations about tapes
 * @param {number} - Tape ID
 * @param {Object} - Updated tape data
 * @returns {Object} 200 - The updated tape information
 * @returns {Error} 500 - Unexpected error
 */
router.put('/:tapeId', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tapeId);
    const tapeData = toSnakeCase(req.body);
    const updatedTape = await updateTape(tape_id, tapeData);
    if (!updatedTape) res.status(404).json({ error: 'No tape found' });
    else {
      const convertedTape = toCamelCase(updatedTape) as TapeData;
      res.json(convertedTape);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Deletes a tape by tape ID.
 * @route DELETE /{tape_id}
 * @param {number} - Tape ID
 * @returns {Object} 200 - Result of the deletion operation
 * @returns {Error} 500 - Unexpected error
 */
router.delete('/:tapeId', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tapeId);
    const result = await deleteTape(tape_id);
    if (!result) res.status(404).json({ error: 'No tape found' });
    else res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Error handling middleware for the tapes router.
 * Unpins files from IPFS if necessary and sends a 500 status code.
 */
router.use('*', async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.locals.coverImageIpfsHash) {
    await unpinFromIpfs(res.locals.coverImageIpfsHash);
  }

  if (res.locals.sampleAudioIpfsHash) {
    await unpinFromIpfs(res.locals.sampleAudioIpfsHash);
  }

  res.status(500).send(err.message);
});

export default router;
