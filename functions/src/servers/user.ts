import express from "express";
import cors from "cors";
import userRoutes from "../routes/user";
import {onRequest} from "firebase-functions/v2/https";

const app = express();
app.use(cors({origin: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", userRoutes);

export default onRequest({
  vpcConnector: "heds-app-connector",
  vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
  cors: true
}, app);