import { User } from '@/modules/user/page/User';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { userData } from '@/modules/user/page/tests/mocks/UserData';

describe('User unit', () => {
  describe('snapshot', () => {
    test('snapshot', async () => {
      await store.dispatch.userModel.setUserData(userData);
      const snapshot = renderWithRematchStore(<User />, store);
      expect(snapshot).toMatchSnapshot();
    });
  });
});
