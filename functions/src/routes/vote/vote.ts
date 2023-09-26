import * as express from "express";
import {castVote} from "../../controllers/vote/vote";

const router = express.Router();

router.post("/", castVote);

export default router