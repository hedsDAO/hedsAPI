// import * as dotenv from 'dotenv';
// import { Request, Response } from 'express';
// import * as admin from 'firebase-admin';
// import { beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals';
// import * as serviceAccount from '../../../service_key.json';
// import { unpinHashFromGateway } from '../../../src/services/pinata/unpinHashFromGateway';
// // import { pinLinkToGateway } from '../../../src/services/pinata/unpinHashFromGateway';
// // import { fileResponse, fileRequest } from '../../mocks/pinataUploadMock';

// jest.setTimeout(10000);

// describe('pinLinkToGateway', () => {
//   const mockIpfsCid = 'QmeLZ4HQc9JSDwc36CJr8PXt69P8mNYCwPL3Qf1XCTGk84';
//   let mockRequest = Object as unknown as Request;
//   let mockResponse = Object as unknown as Response;
//   beforeEach(() => {
//     mockRequest = { params: { ipfsCid: mockIpfsCid } } as unknown as Request;
//     mockResponse = {
//       status: jest.fn(),
//       json: jest.fn(),
//     } as unknown as Response;
//   });

//   beforeAll(async () => {
//     await admin.initializeApp({ credential: admin.credential.cert(serviceAccount as admin.ServiceAccount) });
//     dotenv.config();
//   });

//   describe('GET /', () => {
//     test('removes ipfs cid from gateway when given valid cid', async () => {
//       await unpinHashFromGateway(mockRequest, mockResponse);
//       expect(mockResponse.status).toBeCalled();
//       expect(mockResponse.json).toBeCalled();
//     });
//   });
// });
