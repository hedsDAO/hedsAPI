import { Router, Request, Response, NextFunction } from 'express';
import { getTapeById, saveTapeAndSampleSong, updateTape, deleteTape, getTapeSongs, getAllTapes, getTapeContractArgs } from '../controllers/tapes';
import * as functions from 'firebase-functions';
// import { verifySignature } from '../controllers/utils/verifySignature';
import { checkAdminStatus } from '../controllers/utils/checkAdminStatus';
import { pinFileToGateway } from '../controllers/pinata/pinFileToGateway';
import { unpinHashFromGateway } from '../controllers/pinata/unpinHashFromGateway-v2';
 const router = Router();

export interface RequestWithFile extends Request {
  files?: any;
}


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
  // verifySignature,
  (req, res , next) => {

      functions.logger.info(`body exists: ${Buffer.isBuffer(req.body)}`);
      functions.logger.info(`body: ${(req.body)}`);
      functions.logger.info(`body buffer: ${Buffer.from(req.body.data)}`);
      // functions.logger.info(`songData: ${req.body.songData}`);
      // functions.logger.info(`tapeData: ${req.body.tapeData}`);
      // functions.logger.info(`wallet: ${req.body.curatorWallet}`);
      return next();
    })
  ,
  checkAdminStatus,
  pinFileToGateway('coverImage'),
  pinFileToGateway('sampleAudio'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const curatorWallet = req.body.curatorWallet;
      const gateway = 'https://www.heds.cloud/ipfs/'
      const tapeData = req.body.tapeData;
      tapeData.image = gateway + res.locals['coverImageIpfsHash'];
      const songData = req.body.songData;
      songData.audio = gateway + res.locals['sampleAudioIpfsHash'];
      songData.cover = tapeData.image;
      const newTape = await saveTapeAndSampleSong(tapeData, songData, curatorWallet);
      
      res.status(201).json(newTape);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }


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
