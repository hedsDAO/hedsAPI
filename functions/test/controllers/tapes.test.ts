import { getTapeById, getTapeSongs, createTape, deleteTape } from '../../src/controllers/tapes';
import { mockTapeData as testTapeData } from '../mocks/controllerMockData';

// Mock database functions
jest.mock('../../database', () => ({
  pool: {
    query: jest.fn(),
  },
}));

import { pool } from '../../src/database';

describe('Tapes Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTapeById', () => {
    it('should return a tape by id', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{ id: 1 }],
      });

      const result = await getTapeById(1);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('getTapeSongs', () => {
    it('should return songs for the given tape_id', async () => {
      const tape_id = 1;
      const mockSongs = [
        { id: 1, track_name: 'Song 1' },
        { id: 2, track_name: 'Song 2' },
      ];

      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: mockSongs,
      });

      const result = await getTapeSongs(tape_id);

      expect(pool.query).toHaveBeenCalledWith('SELECT id, track_name FROM heds.songs WHERE tape_id = $1', [tape_id]);
      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSongs);
    });
  });

  describe('createTape', () => {
    it('should create a new tape and return the created tape data', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{ id: 1 }],
      });

      const result = await createTape(testTapeData);

      expect(pool.query).toHaveBeenCalledTimes(3);
      expect(result.tapeId).toBe(1);
      expect(result.user_id).toBe(1);
    });
  });

  describe('deleteTape', () => {
    it('should delete a tape and return a success message', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({});

      const result = await deleteTape(1);

      expect(pool.query).toHaveBeenCalledTimes(3);
      expect(result).toEqual({ success: true, message: 'Tape deleted successfully.' });
    });
  });
});
