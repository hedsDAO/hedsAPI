import * as cors from "cors";
import * as express from "express";
import * as functions from "firebase-functions";
import * as randomData from "../randomData";

// The express instance
const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get("/", (request: express.Request, response: express.Response) => {
  const {adjectives, animals} = randomData;
  const randomAdj = Math.ceil(Math.random() * (adjectives.length));
  const randomAnimal = Math.ceil(Math.random() * (animals.length));
  const submissionId = [adjectives[randomAdj], animals[randomAnimal]].join(" ");
  functions.logger.log(submissionId);
  return response.status(200).json(submissionId);
});

// Expose Express API as a single Cloud Function:
export default functions.https.onRequest(app);
