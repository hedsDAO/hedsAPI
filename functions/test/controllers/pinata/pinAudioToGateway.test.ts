import * as dotenv from "dotenv";
import {Request, Response} from "express";
import * as admin from "firebase-admin";
import {beforeAll, beforeEach, describe, jest, expect, test} from "@jest/globals";
import * as serviceAccount from "../../../service_key.json";
import {pinAudioToGateway} from "./../../../src/controllers/pinata/pinAudioToGateway";

jest.setTimeout(10000);

describe("pinAudioToGateway", () => {
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  beforeEach(() => {
    mockRequest = {
      params: {
        wallet: "0x000000",
        space: "test",
        tape: "test",
        id: "test",
        audioRef: "test.mp3",
      },
    } as unknown as Request;
    mockResponse = {
      locals: {imageUrl: "https://avatars.githubusercontent.com/u/98577422?s=200&v=4", subId: "test"},
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
  });

  beforeAll(async () => {
    await admin.initializeApp({credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)});
    dotenv.config();
  });

  describe("GET /", () => {
    test("returns a pinned, pinata hyperlink for the media url requested", async () => {
      await pinAudioToGateway(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toBeCalled();
    });
    test("returns no hash without media url", async () => {
      await pinAudioToGateway(Object as unknown as Request, mockResponse);
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.locals.subArtIpfsHash).toBeUndefined();
    });
  });
});
