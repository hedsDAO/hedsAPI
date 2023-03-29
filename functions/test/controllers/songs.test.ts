import {getSongByAudio, createSong, deleteSong} from "../../src/controllers/songs";
import {mockSongData as testSongData} from "../mocks/controllerMockData";

// Mock database functions
jest.mock("../../database", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import {pool} from "../../src/database";

describe("Songs Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSongByAudio", () => {
    it("should return a song by audio", async () => {
      (pool.query as jest.Mock)
          .mockResolvedValueOnce({
            rows: [{id: 1}],
          })
          .mockResolvedValueOnce({
            rows: [{user_id: 1}],
          });

      const result = await getSongByAudio("test-audio");

      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(result).toEqual({id: 1, artists: [1]});
    });
  });

  describe("createSong", () => {
    it("should create a new song and return the created song data", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{id: 1}],
      });

      const result = await createSong(testSongData, 1);

      expect(pool.query).toHaveBeenCalledTimes(4);
      expect(result.songId).toBe(1);
      expect(result.user_id).toBe(1);
    });
  });

  describe("deleteSong", () => {
    it("should delete a song and return a success message", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({});

      const result = await deleteSong(1);

      expect(pool.query).toHaveBeenCalledTimes(4);
      expect(result).toEqual({success: true, message: "Song deleted successfully."});
    });
  });
});
