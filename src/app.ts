import express from "express";
import cors from "cors";
import * as functions from "firebase-functions";
import authRoutes from "./routes/app/auth";

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

export default functions
  .runWith({
    vpcConnector: "heds-app-connector",
    vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
  })
  .https.onRequest(app);
