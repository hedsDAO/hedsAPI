import * as express from 'express';
import { getTapeById, createTape, updateTape, deleteTape, getTapeSongs } from '../controllers/tapes';

const router = express.Router();

router.get('/:tape_id', async (req, res) => {
  try {
    const tape_id = parseInt(req.params.tape_id);
    const tape = await getTapeById(tape_id);
    res.json(tape);
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

router.post('/', async (req, res) => {
  try {
    const tapeData = req.body;
    const newTape = await createTape(tapeData);
    res.status(201).json(newTape);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

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

export default router;
