import { beforeAll, describe, jest, test, expect, beforeEach } from '@jest/globals';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../../service_key.json';
import { Response, Request, NextFunction } from 'express';
import { generateId } from '../../../src/controllers/utils/generateId';
import * as dotenv from 'dotenv';
import * as randomData from '../../../src/data/randomData';

jest.setTimeout(20000);

describe('getGeneratedImage', () => {
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = { params: { wallet: '0x1234567890' } } as unknown as Request;
    mockResponse = { locals: { subId: '' }, statusCode: 0, status: jest.fn() } as unknown as Response;
  });

  beforeAll(async () => {
    await admin.initializeApp({ credential: admin.credential.cert(serviceAccount as admin.ServiceAccount) });
    dotenv.config();
  });

  describe('GET /:_subId', () => {
    test('returns a randomly generated two word id', async () => {
      await generateId(mockRequest, mockResponse, nextFunction);
      const adjective = mockResponse.locals.subId.split(' ')[0];
      const animal = mockResponse.locals.subId.split(' ')[1];
      expect(randomData.adjectives.includes(adjective)).toBeTruthy();
      expect(randomData.animals.includes(animal)).toBeTruthy();
    });
    test('returns no sub id and called 400 status function', async () => {
      const invalidRequest = Object as unknown as Request;
      await generateId(invalidRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toBeCalled();
      expect(mockResponse.locals.subId).toBe('');
    });
  });
});
