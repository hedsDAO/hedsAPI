import { unpinHashFromGateway } from '../../services/pinata/unpinHashFromGateway';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as bodyParser from 'body-parser';
import { generateId } from '../../services/utils/generateId';
import { getGeneratedImage } from '../../services/openai/getGeneratedImage';
import { pinLinkToGateway } from '../../services/pinata/pinLinkToGateway';

const app = express.default();
app.use(cors.default({ origin: true }));
app.use(bodyParser.json());

app.get('/:space/:tape/:id/:wallet', generateId, getGeneratedImage, pinLinkToGateway); // gens sub id, art and pinata cid.
app.delete('/:ipfsCid', unpinHashFromGateway); // removes hash from pinata gateway

export default functions.https.onRequest(app);
