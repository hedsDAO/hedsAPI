import * as express from 'express';
import { getTokenOwners } from '../../controllers/vote/strategy';

const router = express.Router();

router.post('/', getTokenOwners);

export default router;
