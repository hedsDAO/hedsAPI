import * as cors from "cors";
import * as express from "express";
import * as functions from "firebase-functions";
import Twitter from "twitter-v2";

// The express instance
const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get("/:_id", (request, response) => {
  functions.logger.log(request.params._id, "params ID");
  const authorizedUser = () => {
    if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET || !process.env.TWITTER_ACCESS_KEY || !process.env.TWITTER_TOKEN_SECRET) {
      functions.logger.log("Missing Twitter API keys");
      return null;
    }
    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_KEY,
      access_token_secret: process.env.TWITTER_TOKEN_SECRET,
    });
    return client;
  };
  (async function() {
    const authUser = await authorizedUser();
    if (authUser) {
      authUser
          .get("tweets", {ids: "" + request.params._id})
          .then((res) => {
            functions.logger.log(res);
            return response.status(200).json(res);
          })
          .catch((err) => {
            functions.logger.log(err);
            return response.status(400).send("tweet not found");
          });
    }
  })();
});

// Expose Express API as a single Cloud Function:
export default functions.https.onRequest(app);
