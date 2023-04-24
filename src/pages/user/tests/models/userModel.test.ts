import axios from 'axios';
import { models, RootModel } from '@/models';
import { API_PREFIX } from '@/models/constants';
import { userModelState } from '@/tests/mocks/models/userModelState';
import { Song, User, UserEvents, UserEventTypes } from '@models/common';
import { init } from '@rematch/core';
import { userModel } from '@pages/user/models/userModel';

jest.mock('axios');

describe('userModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const { user, user_songs, user_events, user_likes } = userModelState;
  const mockResponse = {
    data: { ...user },
  };
  describe('effects', () => {
    it('should fetch user data', async () => {
      const reducerMockFn = jest.fn();
      const { user } = userModelState;
      const { wallet } = user;
      await (userModel.effects as any).getUser.call({ reducerThatIsGoingToBeCalled: reducerMockFn }, { payload: wallet });
      // checking if it was called
      expect(reducerMockFn).toHaveBeenCalled();
      // checking if it was called with the expected params
      expect(reducerMockFn).toHaveBeenCalledWith(wallet);
    });
  });
});
