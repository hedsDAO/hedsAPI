import express from 'express';
import spaceRoutes from '../../routes/vote/space';
import { onRequest } from 'firebase-functions/v2/https';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', spaceRoutes);

export default onRequest(
  {
    vpcConnector: 'heds-app-connector',
    vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
    cors: true,
  },
  app,
);
