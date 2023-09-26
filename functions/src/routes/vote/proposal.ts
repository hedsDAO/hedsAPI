import * as express from "express";
import {getProposal, createProposal, updateProposal, deleteProposal} from "../controllers/proposalController";

const router = express.Router();

router.get("/:ipfs_hash", getProposal);
router.post("/", createProposal);
router.put("/:ipfs_hash", updateProposal);
router.delete("/:ipfs_hash", deleteProposal);

export default router;
