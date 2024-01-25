import express from 'express';
import catalogRoutes from '../../routes/hedsWorld/catalog';
import { onRequest } from 'firebase-functions/v2/https';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', catalogRoutes);

export default onRequest(
  {
    vpcConnector: 'heds-app-connector',
    vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
    cors: true,
  },
  app,
);
