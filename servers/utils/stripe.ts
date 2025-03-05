import express from "express";
import stripeRoutes from "../../routes/utils/stripe";
import * as functions from "firebase-functions";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", stripeRoutes);

// export default onRequest({
//   vpcConnector: "heds-app-connector",
//   vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
//   cors: true,
//   memory: "32GiB"
// }, app);

export default functions.runWith({
  // timeoutSeconds: 540,
  memory: "8GB"
}).https.onRequest(app);
