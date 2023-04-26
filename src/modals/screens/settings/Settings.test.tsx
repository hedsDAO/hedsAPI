import { BrowserRouter as Router } from 'react-router-dom';
import { Settings } from '@/modals/screens/settings/Settings';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';

describe('Settings unit', () => {
  beforeAll(async () => {});
  describe('snapshot', () => {
    test('snapshot', async () => {
      const snapshot = renderWithRematchStore(
        <Router>
          <Settings />
        </Router>,
        store,
      );
      expect(snapshot).toMatchSnapshot();
    });
  });
});
