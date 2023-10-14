import express from "express";
import songRoutes from "../../routes/app/song";
import {onRequest} from "firebase-functions/v2/https";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", songRoutes);

export default onRequest({
  vpcConnector: "heds-app-connector",
  vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
  cors: true
}, app);