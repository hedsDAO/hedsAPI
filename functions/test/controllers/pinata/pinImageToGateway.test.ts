import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { pinImageToGateway } from '../../../src/controllers/pinata/pinImageToGateway';

jest.setTimeout(10000);

describe('pinImageToGateway', () => {
  const mockIpfsHash = 'QmeLZ4HQc9JSDwc36CJr8PXt69P8mNYCwPL3Qf1XCTGk84';
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  let nextFunction: NextFunction = jest.fn();
  beforeEach(() => {
    mockRequest = { params: { wallet: '0x000000', space: 'test', tape: 'test', id: 'test' } } as unknown as Request;
    mockResponse = {
      locals: { imageUrl: 'https://avatars.githubusercontent.com/u/98577422?s=200&v=4', subId: 'test' },
      body: {},
      statusCode: 0,
      status: jest.fn(),
    } as unknown as Response;
    nextFunction = jest.fn();
  });

  beforeAll(async () => {
    dotenv.config();
  });

  describe('GET /', () => {
    test('returns a pinned, pinata hyperlink for the media url requested', async () => {
      await pinImageToGateway(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.locals.subArtIpfsHash).toEqual(mockIpfsHash);
      expect(nextFunction).toBeCalled();
    });
    test('returns no hash without media url', async () => {
      await pinImageToGateway(Object as unknown as Request, mockResponse, nextFunction);
      expect(nextFunction).not.toBeCalled();
      expect(mockResponse.locals.subArtIpfsHash).toBeUndefined();
    });
  });
});
