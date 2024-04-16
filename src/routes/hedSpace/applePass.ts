import { Router } from "express";
import { generatePass } from "../../controllers/hedSpace/applePass";

const router = Router();

router.post("/generatePass/:eventId/:displayName", async (req, res) => {
  try {
    const pass = await generatePass(
      parseInt(req.params.eventId),
      req.params.displayName
    );
    if (pass) {
      const bufferPass = await pass.getAsBuffer();
      res.set("Content-Type", pass.mimeType);
      return res.status(200).send(bufferPass);
    } else {
      return res.status(400).json({ message: "Pass could not be created" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
