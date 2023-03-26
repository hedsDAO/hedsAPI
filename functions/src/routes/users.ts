import * as express from 'express';
import { getUserByWallet, createUser, updateUser, deleteUser } from '../controllers/users';

const router = express.Router();

router.get('/:wallet', async (req, res) => {
  try {
    const wallet = req.params.wallet;
    const user = await getUserByWallet(wallet);
    res.json(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.put('/:user_id', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const userData = req.body;
    const updatedUser = await updateUser(user_id, userData);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete('/:user_id', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const result = await deleteUser(user_id);
    res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
