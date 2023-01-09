import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { Configuration, OpenAIApi } from 'openai';

// The express instance
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/:_subId', (request: express.Request<{ _subId: string }>, response: express.Response) => {
  functions.logger.log(request.params._subId, 'params subId');
  (async function () {
    const openai: OpenAIApi = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    const generatedImage = await openai.createImage({
      prompt: `a pixel art album cover of a small ${request.params._subId} in the center with a white background`,
      n: 1,
      size: '256x256',
    });
    const imageUrl: string | undefined = generatedImage?.data?.data?.[0]?.url;
    if (imageUrl) {
      functions.logger.log(imageUrl);
      return response.status(200).json(imageUrl);
    } else {
      return response.status(400);
    }
  })();
});

// Expose Express API as a single Cloud Function:
export default functions.https.onRequest(app);
