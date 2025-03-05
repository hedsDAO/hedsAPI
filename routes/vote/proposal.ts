import * as express from 'express';
// import { toCamelCase } from '../../common';
// import { determineProposalStatus } from '../../controllers/utils/determineProposalStatus';
// import { getProposal, createProposal, updateProposal, deleteProposal, getTapeFromProposalId, getTapeTracks } from '../../controllers/vote/proposal';
// import * as functions from 'firebase-functions';
// import { ProposalState } from 'hedsvote';

const router = express.Router();

// router.get('/:ipfs_hash', async (req, res) => {
//   const ipfsHash = req.params.ipfs_hash;

//   try {
//     const proposal = await getProposal(ipfsHash);
//     functions.logger.info('proposal', proposal);
//     if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
//     else {
//       functions.logger.info('proposal', proposal);
//       const proposalStatus = determineProposalStatus(proposal.start_time, proposal.end_time);
//       if (proposalStatus === ProposalState.CLOSED) {
//         const tapeFromProposalId = await getTapeFromProposalId(proposal.ipfs_hash);
//         const tapeTracks = tapeFromProposalId?.id ?  await getTapeTracks(tapeFromProposalId.id) : [];
//         const convertedProposal = await toCamelCase({ ...proposal, tape: tapeFromProposalId, tracks: tapeTracks });
//         return res.status(200).json({ ...convertedProposal, state: proposalStatus });
//       }
//       const convertedProposal = await toCamelCase(proposal);
//       return res.status(200).json({ ...convertedProposal, state: proposalStatus });
//     }
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const createdProposal = await createProposal(req.body);
//     if (createdProposal === 'Space not found') return res.status(404).json({ error: 'Space not found' });
//     if (createdProposal === 'NOT AUTHORIZED') return res.status(401).json({ error: 'User is not authorized to create a proposal in this space' });
//     if (!createdProposal) return res.status(400).json({ error: 'Invalid proposal' });

//     const convertedProposal = await toCamelCase(createdProposal);
//     return res.status(200).json({ ...convertedProposal, state: determineProposalStatus(createdProposal.start_time, createdProposal.end_time) });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// });
// router.put('/:ipfs_hash', async (req, res) => {
//   try {
//     const updatedProposal = await updateProposal(req.params.ipfs_hash, req.body.updatedProposal);
//     if (updatedProposal === 'Proposal not found') return res.status(404).json({ error: 'Proposal not found' });
//     const convertedProposal = await toCamelCase(updatedProposal);
//     return res.status(200).json({ ...convertedProposal, state: determineProposalStatus(updatedProposal.start_time, updatedProposal.end_time) });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// });
// router.delete('/:ipfs_hash', async (req, res) => {
//   try {
//     const deletedProposal = await deleteProposal(req.params.ipfs_hash);
//     if (deletedProposal === 'Proposal not found') return res.status(404).json({ error: 'Proposal not found' });
//     return res.status(200).json({ message: 'Proposal deleted' });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// });

export default router;
