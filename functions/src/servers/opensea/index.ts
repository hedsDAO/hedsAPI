import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as bodyParser from 'body-parser';
import { getOpenseaActiveListings } from '../../controllers/opensea/getOpenseaActiveListings';

// The express instance
const app = express.default();

// Automatically allow cross-origin requests
app.use(cors.default({ origin: true }));
app.use(bodyParser.json());

// verifies if the twitter handle is valid
app.get('/:limit?', getOpenseaActiveListings);

export default functions.https.onRequest(app);
