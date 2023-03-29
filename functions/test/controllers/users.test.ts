import {getUserByWallet, createUser, updateUser, deleteUser, getUserSongs, getUserLikes, getUserEvents} from "../../src/controllers/users";
import {mockUserData as testUserData} from "../mocks/controllerMockData";

// Mock database functions
jest.mock("../../database", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import {pool} from "../../src/database";

describe("Users Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserByWallet", () => {
    it("should return a user by wallet", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{id: 1}],
      });

      const result = await getUserByWallet("test_wallet");

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual({id: 1});
    });
  });

  describe("createUser", () => {
    it("should create a new user and return the created user data", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{id: 1}],
      });

      const result = await createUser(testUserData);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual({id: 1});
    });
  });

  describe("updateUser", () => {
    it("should update a user and return the updated user data", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{id: 1}],
      });

      const result = await updateUser(1, testUserData);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual({id: 1});
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return a success message", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({});

      const result = await deleteUser(1);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual({success: true, message: "User deleted successfully."});
    });
  });

  describe("getUserSongs", () => {
    it("should return user songs", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{id: 1}],
      });

      const result = await getUserSongs(1);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{id: 1}]);
    });
  });

  describe("getUserLikes", () => {
    it("should return user likes", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{id: 1}],
      });

      const result = await getUserLikes(1);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{id: 1}]);
    });
  });

  describe("getUserEvents", () => {
    it("should return user events", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{id: 1}],
      });

      const result = await getUserEvents(1);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{id: 1}]);
    });
  });
});
