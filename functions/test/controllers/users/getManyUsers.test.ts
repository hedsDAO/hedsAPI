import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals';
import * as serviceAccount from '../../../service_key.json';
import { getManyUsers } from '../../../src/controllers/firestore/getManyUsers';
import userDataReqMock from '../../mocks/userDataReqMock';

jest.setTimeout(20000);

describe('getManyUsers', () => {
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  beforeEach(() => {
    mockRequest = {
      body: {
        users: [...userDataReqMock],
      },
    } as unknown as Request;

    mockResponse = {
      status: jest.fn(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
  });

  beforeAll(async () => {
    await admin.initializeApp({ credential: admin.credential.cert(serviceAccount as admin.ServiceAccount) });
    dotenv.config();
  });

  describe('GET /', () => {
    test('fetches data for more than 10 requests', async () => {
      await getManyUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(200);
    });

    test('throws error for request with no wallets', async () => {
      const invalidRequest = {
        body: {
          users: [],
        },
      } as unknown as Request;
      await getManyUsers(invalidRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.send).toBeCalled();
    });
  });
});
