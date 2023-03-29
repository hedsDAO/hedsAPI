import {beforeAll, describe, jest, expect, test, beforeEach} from "@jest/globals";
import * as admin from "firebase-admin";
import * as serviceAccount from "../../../service_key.json";
import {Request, Response, NextFunction} from "express";
import * as dotenv from "dotenv";
import {getGeneratedImage} from "../../../src/controllers/openai/getGeneratedImage";

jest.setTimeout(50000);

describe("getGeneratedImage", () => {
  let mockRequest = Object as unknown as Request;
  let mockResponse = Object as unknown as Response;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = Object as unknown as Request;
    mockResponse = {
      locals: {
        subId: "wild boar",
      },
      status: jest.fn(),
    } as unknown as Response;
  });
  beforeAll(async () => {
    await admin.initializeApp({credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)});
    dotenv.config();
  });

  test("returns generate image link based on submission id", async () => {
    await getGeneratedImage(mockRequest, mockResponse, nextFunction);
    expect(mockResponse.locals.imageUrl).toBeDefined();
    expect(nextFunction).toHaveBeenCalled();
  });

  test("returns error when no sub id is provided", async () => {
    await getGeneratedImage(Object as unknown as Request, mockResponse, nextFunction).catch((e) => {
      expect(e).toBeDefined();
    });
  });
});
