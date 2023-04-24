import { BrowserRouter as Router } from 'react-router-dom';
import { User } from '@/pages/user/screens/User';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';

describe('User unit', () => {
  beforeAll(async () => {});
  describe('snapshot', () => {
    test('snapshot', async () => {
      const snapshot = renderWithRematchStore(
        <Router>
          <User />
        </Router>,
        store,
      );
      expect(snapshot).toMatchSnapshot();
    });
  });
});
