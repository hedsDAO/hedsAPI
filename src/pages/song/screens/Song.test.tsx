import { BrowserRouter as Router } from 'react-router-dom';
import { Song } from '@/pages/song/screens/Song';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';

describe('Song unit', () => {
  beforeAll(async () => {});
  describe('snapshot', () => {
    test('snapshot', async () => {
      const snapshot = renderWithRematchStore(
        <Router>
          <Song />
        </Router>,
        store,
      );
      expect(snapshot).toMatchSnapshot();
    });
  });
});
