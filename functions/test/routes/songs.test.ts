import * as dotenv from "dotenv";
import {describe, expect, test} from "@jest/globals";
import request from "supertest";
import app from "../../src/app";
import {mockSongData} from "../mocks/controllerMockData";

describe("Songs API", () => {
  beforeAll(() => {
    dotenv.config();
  });

  describe("GET /songs/:audio", () => {
    test("should return the song by audio", async () => {
      const audio = "https://www.heds.cloud/ipfs/QmPMmixLJ1sPmojSWAW1MVJggQxoeMy958atiqNadnpUoL";
      const response = await request(app).get(`/songs/${encodeURIComponent(audio)}`);

      expect(response.status).toEqual(200);
      expect(response.body).toBeTruthy();
    });
  });

  describe("POST /songs", () => {
    test("should create a new song and return it", async () => {
      const user_id = 101;
      const response = await request(app).post("/songs").send({mockSongData, user_id});

      expect(response.status).toEqual(201);
      expect(response.body).toBeTruthy();
    });
  });

  // describe('DELETE /songs/:song_id', () => {
  //   test('should delete a song and return the result', async () => {
  //     const song_id = 101;
  //     const response = await request(app).delete(`/songs/${song_id}`);

  //     expect(response.status).toEqual(200);
  //     expect(response.body).toBeTruthy();
  //   });
  // });

  describe("GET /songs/:song_id/likes", () => {
    test.only("should return the likes for the song by song_id", async () => {
      const song_id = "101";
      const response = await request(app).get(`/songs/${song_id}/likes`);

      expect(response.status).toEqual(200);
      expect(response.body).toBeTruthy();
    });
  });
});
