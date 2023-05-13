import { BrowserRouter as Router } from 'react-router-dom';
import { Twitter } from '@/modals/screens/twitter/Twitter';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';

describe('Twitter unit', () => {
  beforeAll(async () => {});
  describe('snapshot', () => {
    test('snapshot', async () => {
      const snapshot = renderWithRematchStore(
        <Router>
          <Twitter />
        </Router>,
        store,
      );
      expect(snapshot).toMatchSnapshot();
    });
  });
});
