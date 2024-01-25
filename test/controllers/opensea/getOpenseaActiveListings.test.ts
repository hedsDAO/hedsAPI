import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { getOpenseaActiveListings } from '../../../src/controllers/opensea/getOpenseaActiveListings';

jest.setTimeout(20000);

describe('getOpenseaActiveListings', () => {
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  beforeEach(() => {
    mockRequest = { params: { limit: '2' } } as unknown as Request;
    mockResponse = {
      status: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;
  });

  beforeAll(async () => {
    dotenv.config();
  });

  describe('GET /', () => {
    test('returns active opensea listings with limit', async () => {
      await getOpenseaActiveListings(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.send).toBeCalled();
    });
  });
});
