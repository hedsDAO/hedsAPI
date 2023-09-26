import * as express from "express";
import {getTokenOwners} from "../controllers/strategyController";

const router = express.Router();

router.post("/", getTokenOwners);

export default router;