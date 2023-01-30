import { beforeAll, beforeEach, describe, jest, expect, test } from '@jest/globals';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../../service_key.json';
import { authenticateTweet } from '../../../src/controllers/twitter/authenticateTweet';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

jest.setTimeout(20000);

describe('authenticateTweet', () => {
  const tweetId = '1612535647973289984';
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = { params: { tweetId: tweetId } } as unknown as Request;
    mockResponse = {
      locals: {
        response: {},
      },
      status: jest.fn(),
    } as unknown as Response;
  });

  beforeAll(async () => {
    await admin.initializeApp({ credential: admin.credential.cert(serviceAccount as admin.ServiceAccount) });
    dotenv.config();
  });

  describe('GET /:_tweetId', () => {
    test('returns sucessful response when given a valid tweet id', async () => {
      await authenticateTweet(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.locals.response).toBeDefined();
    });
    test('returns error when no tweet id is present', async () => {
      await authenticateTweet(Object as unknown as Request, mockResponse, nextFunction).catch((e) => {
        expect(e).toBeDefined();
      });
    });
  });
});
