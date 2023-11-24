import * as express from 'express';
import { getSpaces, createSpace, updateSpace, deleteSpace, getProposalsInSpace, getAllSpacesByAdmin } from '../../controllers/vote/space';

const router = express.Router();

router.get('/:spaceName/proposals', getProposalsInSpace);
router.get('/userId', getAllSpacesByAdmin);
router.get('/', getSpaces);
router.post('/', createSpace);
router.put('/', updateSpace);
router.delete('/:spaceName', deleteSpace);

export default router;
