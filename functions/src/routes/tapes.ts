import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { getTapeById, saveTapeAndSampleSong, updateTape, deleteTape, getTapeSongs, getAllTapes, getTapeContractArgs } from '../controllers/tapes';
import * as functions from 'firebase-functions';
import { verifySignature } from '../controllers/utils/verifySignature';
import { checkAdminStatus } from '../controllers/utils/checkAdminStatus';
import { pinFileToGateway } from '../controllers/pinata/pinFileToGateway';
import { unpinHashFromGateway } from '../controllers/pinata/unpinHashFromGateway-v2';
const router = Router();
const upload = multer();

router.get('/get-collection-args', async (req, res) => {
  try {
    const results = await getTapeContractArgs();
    res.json(results);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    functions.logger.log('GET /tapes');
    const tapesInfo = await getAllTapes();
    res.json(tapesInfo);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

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

router.get('/:tape_id/songs', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tape_id);
    const songs = await getTapeSongs(tape_id);
    res.json(songs);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post(
  '/',
  verifySignature,
  checkAdminStatus,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'sampleAudio', maxCount: 1 },
  ]),
  pinFileToGateway('coverImage'),
  pinFileToGateway('sampleAudio'),
  async (req, res, next) => {
    try {
      const gateway = 'https://www.heds.cloud/ipfs/'
      const tapeData = req.body.tapeData;
      tapeData.image = gateway + res.locals['coverImageIpfsHash'];
      const songData = req.body.songData;
      songData.audio = gateway + res.locals['sampleAudioIpfsHash'];
      const adminUserId = res.locals.adminId;
      const newTape = await saveTapeAndSampleSong(tapeData, songData, adminUserId);
      
      res.status(201).json(newTape);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
);


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

router.delete('/:tape_id', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tape_id);
    const result = await deleteTape(tape_id);
    res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.use('*',async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.locals.coverImageIpfsHash) {
    await unpinHashFromGateway(res.locals.coverImageIpfsHash);
  }
  
  if (res.locals.sampleAudioIpfsHash) {
    await unpinHashFromGateway(res.locals.sampleAudioIpfsHash);
  }

  res.status(500).send(err.message);
});


export default router;
