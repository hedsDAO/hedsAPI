import * as cors from "cors";
import * as express from "express";
import * as functions from "firebase-functions";
import * as bodyParser from "body-parser";
import {validateTwitterHandle} from "../../services/utils/validateTwitterHandle";
import {authenticateTweet} from "../../services/twitter/authenticateTweet";

// The express instance
const app = express.default();

// Automatically allow cross-origin requests
app.use(cors.default({origin: true}));
app.use(bodyParser.json());

// verifies if the twitter handle is valid
app.get("/:wallet/:tweetId/:twitterHandle/:userHash", authenticateTweet, validateTwitterHandle);

export default functions.https.onRequest(app);
