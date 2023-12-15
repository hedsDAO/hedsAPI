import * as express from 'express';
import { toCamelCase } from '../../common';
import { determineProposalStatus } from '../../controllers/utils/determineProposalStatus';
import { getSpaces, createSpace, updateSpace, deleteSpace, getProposalsInSpace, getAllSpacesByAdmin, getSpaceByName } from '../../controllers/vote/space';

const router = express.Router();

router.get('/:spaceName/proposals', async (req, res) => {
  const name = req.params.spaceName;
  try {
    const proposals = await getProposalsInSpace(name);
    if (proposals === 'Space not found') {
      return res.status(404).json({ error: 'Space not found' });
    }
    if (!proposals) {
      return res.status(404).json({ error: 'Space proposals not found' });
    } else {
      const convertedProposals = proposals.map((proposal: any) => {
        const convertedProposal = toCamelCase(proposal);
        return {
          ...convertedProposal,
          state: determineProposalStatus(proposal.start_time, proposal.end_time),
        };
      });
      return res.status(200).json(convertedProposals);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/space/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const spaces = await getAllSpacesByAdmin(parseInt(userId));
    if (!spaces || spaces.length < 1) return res.status(404).json({ error: 'No spaces found for user' });
    const convertedSpaces = spaces.map((space: any) => {
      const convertedSpace = toCamelCase(space);
      return convertedSpace;
    });
    return res.status(200).json(convertedSpaces);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:spaceName', async (req, res) => {
  const name = req.params.spaceName;
  try {
    const space = await getSpaceByName(name);
    if (!space) return res.status(404).json({ error: 'Space not found' });
    const convertedSpace = toCamelCase(space);
    return res.status(200).json(convertedSpace);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const spaces = await getSpaces();
    if (!spaces || spaces.length < 1) return res.status(404).json({ error: 'No spaces found' });
    const convertedSpaces = spaces.map((space: any) => {
      const convertedSpace = toCamelCase(space);
      return convertedSpace;
    });
    return res.status(200).json(convertedSpaces);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const createdSpace = await createSpace(req.body);
    if (!createdSpace) return res.status(404).json({ error: 'Space not created' });
    return res.status(201).json(createdSpace);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const updatedSpace = await updateSpace(req.body);
    if (!updatedSpace) return res.status(404).json({ error: 'Space not updated' });
    if (updatedSpace === 'Space not found') return res.status(404).json({ error: 'Space not found' });

    return res.status(200).json(updatedSpace);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:spaceName', async (req, res) => {
  const name = req.params.spaceName;
  try {
    const deletedSpace = await deleteSpace(name);
    if (deletedSpace === 'Space not found') return res.status(404).json({ error: 'Space not found' });
    return res.status(200).send('space deleted');
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
