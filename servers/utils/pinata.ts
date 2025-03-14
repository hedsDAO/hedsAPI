import express from "express";
import pinataRoutes from "../../routes/utils/pinata";
import {onRequest} from "firebase-functions/v2/https";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", pinataRoutes);

export default onRequest({
  vpcConnector: "heds-app-connector",
  vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
  cors: true,
  memory: "512MiB"
}, app);