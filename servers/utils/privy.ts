import express from "express";
import privyRoutes from "../../routes/utils/privy";
import { onRequest } from "firebase-functions/v2/https";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", privyRoutes);

export default onRequest(
  {
    vpcConnector: "heds-app-connector",
    vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
    cors: true,
    memory: "512MiB",
  },
  app
);
