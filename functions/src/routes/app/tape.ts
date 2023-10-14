import { Router, Request, Response, NextFunction } from 'express';
import { getTapeById, saveTapeAndSampleSong, updateTape, deleteTape, getTapeSongs, getAllTapes, getTapeContractArgs, countArtistTracks } from '../../controllers/tapes';
import * as functions from 'firebase-functions';
import { pinFileToIpfs, unpinFromIpfs } from '../../controllers/utils/pinata';

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
    return res.json(results);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
})

/**
 * Retrieves contract arguments for tapes.
 * @route GET /get-collection-args
 * @returns {Object} 200 - An array of tape contract arguments
 * @returns {Error} 500 - Unexpected error
 */
router.get('/get-collection-args', async (req, res) => {
  try {
    const results = await getTapeContractArgs();
    res.json(results);
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
    res.json(tapesInfo);
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
router.get('/:tape_id', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tape_id);
    const tape = await getTapeById(tape_id);
    const songs = await getTapeSongs(tape_id);
    res.json({ ...tape, songs });
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
router.get('/:tape_id/songs', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tape_id);
    const songs = await getTapeSongs(tape_id);
    res.json(songs);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Creates a new tape along with a sample song, requires admin privileges.
 * @route POST /
 * @param {Object} - Tape and song data
 * @returns {Object} 201 - The created tape information
 * @returns {Error} 403 - Forbidden for non-admin users
 * @returns {Error} 500 - Unexpected error
 */
router.post(
  '/',   async (req, res , next) => {
    const user = req.body.user;

    if (user.role !== "admin") {
        return res.status(403).send('User is not an admin'); 
    }

    try {
      const imageObject = await pinFileToIpfs(req.body.coverImage, req.body.tapeData.name);
      const audioObject = await pinFileToIpfs(req.body.sampleAudio,req.body.songData.track_name);
      res.locals["coverImageIpfsHash"] = imageObject.IpfsHash;
      res.locals["sampleAudioIpfsHash"] = audioObject.IpfsHash;
      return next();
   } catch (e) {
    functions.logger.log("error", e)
    return next(e)
   }
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const curatorWallet = req.body.user.wallet;
      const gateway = 'https://www.heds.cloud/ipfs/'
      const tapeData = req.body.tapeData;
      tapeData.image = gateway + res.locals['coverImageIpfsHash'];
      const songData = req.body.songData;
      songData.audio = gateway + res.locals['sampleAudioIpfsHash'];
      songData.cover = tapeData.image;
      const newTape = await saveTapeAndSampleSong(tapeData, songData, curatorWallet);
      
      res.status(201).json(newTape);
    } catch (error: any) {
      next(error)
      res.status(500).json(error.message);
    }
  })

/**
 * Updates a tape by tape ID.
 * @route PUT /{tape_id}
 * @group tapes - Operations about tapes
 * @param {number} - Tape ID
 * @param {Object} - Updated tape data
 * @returns {Object} 200 - The updated tape information
 * @returns {Error} 500 - Unexpected error
 */
router.put('/:tape_id', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tape_id);
    const tapeData = req.body;
    const updatedTape = await updateTape(tape_id, tapeData);
    res.json(updatedTape);
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
router.delete('/:tape_id', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tape_id);
    const result = await deleteTape(tape_id);
    res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Error handling middleware for the tapes router.
 * Unpins files from IPFS if necessary and sends a 500 status code.
 */
router.use('*',async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.locals.coverImageIpfsHash) {
    await unpinFromIpfs(res.locals.coverImageIpfsHash);
  }
  
  if (res.locals.sampleAudioIpfsHash) {
    await unpinFromIpfs(res.locals.sampleAudioIpfsHash);
  }

  res.status(500).send(err.message);
});


export default router;
