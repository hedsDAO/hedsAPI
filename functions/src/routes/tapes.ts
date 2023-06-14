import { Router, Request, Response, NextFunction } from 'express';
import { getTapeById, saveTapeAndSampleSong, updateTape, deleteTape, getTapeSongs, getAllTapes, getTapeContractArgs } from '../controllers/tapes';
import * as functions from 'firebase-functions';
// import { verifySignature } from '../controllers/utils/verifySignature';
import { checkAdminStatus } from '../controllers/utils/checkAdminStatus';
import { pinFileToGateway } from '../controllers/pinata/pinFileToGateway';
import { unpinHashFromGateway } from '../controllers/pinata/unpinHashFromGateway-v2';
// import axios from 'axios';
// import FormData from 'form-data';
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
  //  async (req, res , next) => {

  //   try {
  //     // Download file from URL as a buffer
  //     functions.logger.log("link: ", req.body.link)
  //     const response = await axios.get(req.body.link, { responseType: 'arraybuffer' });
  //     const buffer = Buffer.from(response.data, 'binary');
  //     console.log("buffer", buffer);
  //     functions.logger.log("response", response.data)


  //     const data = new FormData();
  //   // Metadata for pinata can be customized as needed
  //   const pinataMetadata = {
  //     name: "test cover image pin"
  //   };

  //   data.append('pinataMetadata', JSON.stringify(pinataMetadata));
  //   data.append('file', response.data, "test cover image pin");

  //   try {
  //     const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
  //       maxBodyLength: Infinity,
  //       headers: {
  //         ...data.getHeaders(),
  //         pinata_api_key: process.env.PINATA_API_KEY,
  //         pinata_secret_api_key: process.env.PINATA_API_SECRET,
  //       },
  //     });

  //     functions.logger.log("data pinned: ", response)
  // } catch (error) {
  //     console.log(error);
  // }
  //     return next();
  //   } catch (e) {
  //     console.log(e)
  //   }
  // },
  checkAdminStatus,
  (req,res) => pinFileToGateway(req.body.coverImage,'coverImage'),
  (req,res) => pinFileToGateway(req.body.sampleAudio,'sampleAudio'),
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
  })


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
