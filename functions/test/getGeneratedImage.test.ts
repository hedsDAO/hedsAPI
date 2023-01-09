// import { beforeAll, describe, jest, expect, test } from '@jest/globals';
// import * as admin from 'firebase-admin';
// import * as serviceAccount from '../../functions/service_key.json';
// import * as request from 'supertest';
// import getGenerateImageServer from '../src/openai/getGeneratedImage';

// jest.setTimeout(50000);

// describe('openai/getGeneratedImage', () => {
//   const subId = 'curious bobcat';
//   beforeAll(async () => {
//     await admin.initializeApp({ credential: admin.credential.cert(serviceAccount as admin.ServiceAccount) });
//   });

//   describe('GET /:_subId', () => {
//     test('returns generate image link based on submission id', async () => {
//       const res = await request(getGenerateImageServer).get(`/${subId}`);
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toContain('.png');
//     });
//   });
// });
