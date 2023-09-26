import express from "express";
import userRoutes from "../../routes/app/user";
import {onRequest} from "firebase-functions/v2/https";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", userRoutes);

export default onRequest({
  vpcConnector: "heds-app-connector",
  vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
  cors: true
}, app);