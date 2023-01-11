import * as dotenv from "dotenv";
import {Request, Response} from "express";
import * as admin from "firebase-admin";
import {beforeAll, beforeEach, describe, expect, jest, test} from "@jest/globals";
import * as serviceAccount from "../../../service_key.json";
import {pinLinkToGateway} from "../../../src/services/pinata/pinLinkToGateway";

jest.setTimeout(10000);

describe("pinLinkToGateway", () => {
  const mockIpfsHash = "QmeLZ4HQc9JSDwc36CJr8PXt69P8mNYCwPL3Qf1XCTGk84";
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  beforeEach(() => {
    mockRequest = {params: {wallet: "0x000000", space: "test", tape: "test", id: "test"}} as unknown as Request;
    mockResponse = {
      locals: {imageUrl: "https://avatars.githubusercontent.com/u/98577422?s=200&v=4", subId: "test"},
      body: {},
      statusCode: 0,
      status: jest.fn(),
    } as unknown as Response;
  });

  beforeAll(async () => {
    await admin.initializeApp({credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)});
    dotenv.config();
  });

  describe("GET /", () => {
    test("returns a pinned, pinata hyperlink for the media url requested", async () => {
      await pinLinkToGateway(mockRequest, mockResponse);
      expect(mockResponse.locals.subArtIpfsHash).toEqual(mockIpfsHash);
      expect(mockResponse.status).toBeCalled();
    });
    test("returns no hash without media url", async () => {
      await pinLinkToGateway(Object as unknown as Request, mockResponse);
      expect(mockResponse.status).toBeCalled();
      expect(mockResponse.locals.subArtIpfsHash).toBeUndefined();
    });
  });
});
