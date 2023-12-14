import * as express from 'express';
import { toCamelCase } from '../../common';
import { determineProposalStatus } from '../../controllers/utils/determineProposalStatus';
import { getProposal, createProposal, updateProposal, deleteProposal } from '../../controllers/vote/proposal';

const router = express.Router();

router.get('/:ipfs_hash', async (req, res) => {
  const ipfsHash = req.params.ipfs_hash;

  try {
    const proposal = await getProposal(ipfsHash);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    else {
      const convertedProposal = await toCamelCase(proposal);
      return res.status(200).json({ ...convertedProposal, state: determineProposalStatus(proposal.start_time as Date, proposal.end_time as Date) });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const createdProposal = await createProposal(req.body);
    if (createdProposal === 'Space not found') return res.status(404).json({ error: 'Space not found' });
    if (createdProposal === 'NOT AUTHORIZED') return res.status(401).json({ error: 'User is not authorized to create a proposal in this space' });
    if (!createdProposal) return res.status(400).json({ error: 'Invalid proposal' });

    const convertedProposal = await toCamelCase(createdProposal);
    return res.status(200).json({ ...convertedProposal, state: determineProposalStatus(createdProposal.start_time as Date, createdProposal.end_time as Date) });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
router.put('/:ipfs_hash', async (req, res) => {
  try {
    const updatedProposal = await updateProposal(req.params.ipfs_hash, req.body.updatedProposal);
    if (updatedProposal === 'Proposal not found') return res.status(404).json({ error: 'Proposal not found' });
    const convertedProposal = await toCamelCase(updatedProposal);
    return res.status(200).json({ ...convertedProposal, state: determineProposalStatus(updatedProposal.start_time as Date, updatedProposal.end_time as Date) });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
router.delete('/:ipfs_hash', async (req, res) => {
  try {
    const deletedProposal = await deleteProposal(req.params.ipfs_hash);
    if (deletedProposal === 'Proposal not found') return res.status(404).json({ error: 'Proposal not found' });
    return res.status(200).json({ message: 'Proposal deleted' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
