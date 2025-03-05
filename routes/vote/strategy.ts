import * as express from 'express';
// import { getTokenOwners } from '../../controllers/vote/strategy';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // const tokenOwners = await getTokenOwners(req.body);
    // if (!tokenOwners) return res.status(404).json({ error: 'Token owners not found' });
    // if (tokenOwners === 'error in fetching owners') return res.status(404).json({ error: 'error in fetching owners' });

    return res.status(200).json('Strategies successfully added to the proposal');
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
