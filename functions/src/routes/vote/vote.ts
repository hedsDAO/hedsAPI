import * as express from 'express';
import { toCamelCase } from '../../common';
import { castVote } from '../../controllers/vote/vote';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const vote = await castVote(req.body);
    if (!vote) return res.status(404).json({ error: 'Vote not found' });
    if (vote === 'Proposal not found') return res.status(404).json({ error: 'Proposal not found' });
    if (vote === 'Unauthorized: Signature does not match address') return res.status(401).json({ error: 'Unauthorized: Signature does not match address' });
    if (vote === 'Proposal is not in an open state') return res.status(400).json({ error: 'Proposal is not in an open state' });
    const convertedVote = toCamelCase(vote);
    return res.status(200).json(convertedVote);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
