import axios from 'axios';
import { models, RootModel } from '@/models';
import { userModelState } from '@/tests/mocks/models/userModelState';
import { init } from '@rematch/core';

describe('userModel unit', () => {
  describe('reducers', () => {
    it('should set user data when given payload', async () => {
      const store = init<RootModel>({ models });
      const { user } = userModelState;
      await store.dispatch.userModel.setUser(user);
      const myModelData = store.getState().userModel.user;
      expect(myModelData).toEqual(user);
    });
    it('should set user songs data when given payload', async () => {
      const store = init<RootModel>({ models });
      const { user_songs } = userModelState;
      await store.dispatch.userModel.setUserSongs(user_songs);
      const myModelData = store.getState().userModel.user_songs;
      expect(myModelData).toEqual(user_songs);
    });
    it('should set user likes data when given payload', async () => {
      const store = init<RootModel>({ models });
      const { user_likes } = userModelState;
      await store.dispatch.userModel.setUserLikes(user_likes);
      const myModelData = store.getState().userModel.user_likes;
      expect(myModelData).toEqual(user_likes);
    });
    it('should set user events data when given payload', async () => {
      const store = init<RootModel>({ models });
      const { user_events } = userModelState;
      await store.dispatch.userModel.setUserEvents(user_events);
      const myModelData = store.getState().userModel.user_events;
      expect(myModelData).toEqual(user_events);
    });
  });
  describe('effects', () => {
    it('effect: getUser effect should get user data', async () => {
      const store = init<RootModel>({ models });
      const user = userModelState.user;
      const axiosGetSpy = jest.spyOn(axios, 'get');

      axiosGetSpy
        .mockResolvedValueOnce({ data: userModelState.user })
        .mockResolvedValueOnce({ data: {} }) // Assuming you don't have a spotlight song in your mock data
        .mockResolvedValueOnce({ data: userModelState.user_songs })
        .mockResolvedValueOnce({ data: userModelState.user_likes })
        .mockResolvedValueOnce({ data: userModelState.user_events });

      await store.dispatch.userModel.getUser(user.wallet);
      const userData = store.getState().userModel.user;
      expect(userData).toEqual(userData);
      axiosGetSpy.mockRestore();
    });
  });
});
