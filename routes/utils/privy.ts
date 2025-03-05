import * as express from "express";
import { bulkUpload } from "../../controllers/utils/privy";

const router = express.Router();

router.get("/privyBulkUpload", async (req, res) => {
  try {
    const result = await bulkUpload();
    return res.json(result);
  } catch (error: any) {
    return;
  }
});

export default router;
