import * as cors from "cors";
import * as express from "express";
import * as functions from "firebase-functions";
import * as bodyParser from "body-parser";
import {getManyUsers} from "../../controllers/firestore/getManyUsers";

const app = express.default();
app.use(cors.default({origin: true}));
app.use(bodyParser.json());

app.post("/getManyUsers", getManyUsers); // recieves a body of an array of wallets and returns an array of user data for each

export default functions.https.onRequest(app);
