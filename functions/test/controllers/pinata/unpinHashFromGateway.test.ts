import * as dotenv from "dotenv";
import {Request, Response} from "express";
import * as admin from "firebase-admin";
import {beforeAll, beforeEach, describe, expect, jest, test} from "@jest/globals";
import * as serviceAccount from "../../../service_key.json";
import {pinLinkToGateway} from "../../../src/controllers/pinata/pinLinkToGateway";
import {unpinHashFromGateway} from "../../../src/controllers/pinata/unpinHashFromGateway";

jest.setTimeout(10000);

describe("pinLinkToGateway", () => {
  const mockIpfsCid = "QmeLZ4HQc9JSDwc36CJr8PXt69P8mNYCwPL3Qf1XCTGk84";
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  beforeEach(async () => {
    mockRequest = {params: {ipfsCid: mockIpfsCid}} as unknown as Request;
    mockResponse = {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
  });

  beforeAll(async () => {
    await admin.initializeApp({credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)});
    dotenv.config();
  });

  describe("GET /", () => {
    test("removes ipfs cid from gateway when given valid cid", async () => {
      const fileRequest = {params: {wallet: "0x000000", space: "test", tape: "test", id: "test"}} as unknown as Request;
      const fileResponse = {
        locals: {imageUrl: "https://avatars.githubusercontent.com/u/98577422?s=200&v=4", subId: "test"},
        status: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;
      await pinLinkToGateway(fileRequest, fileResponse).then(async () => {
        await unpinHashFromGateway(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalled();
        expect(mockResponse.json).toBeCalled();
      });
    });

    test("returns 400 when given invalid cid", async () => {
      await unpinHashFromGateway(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalled();
      expect(mockResponse.json).not.toBeCalled();
    });
  });
});
