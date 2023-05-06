import { Related } from '@/pages/song/components/Related/Related';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { songModelState } from '@/tests/mocks/models/songModelState';
import { screen } from '@testing-library/react';

describe('Related unit', () => {
  beforeEach(() => {
    store.dispatch.songModel.setState(songModelState);
    store.dispatch.paginationModel.setState({ currentPage: 0, itemsPerPage: 6 });
    renderWithRematchStore(
      <Router>
        <Related />
      </Router>,
      store,
    );
  });
  it('renders song like grid', () => {
    const trackItems = screen.getByTestId('song-related-grid');
    expect(trackItems).toBeInTheDocument();
  });
  it('renders all related song grid items', () => {
    const relatedSongs = songModelState.relatedSongs.slice(0, 5);
    for (let i = 0; i < relatedSongs.length; i++) {
      const relatedSong = screen.getByTestId(`song-related-${i}`);
      expect(relatedSong).toBeInTheDocument();
    }
  });
  it('renders empty related song grid items', () => {
    const relatedSong = songModelState.relatedSongs;
    if (relatedSong?.length < 6) {
      const expectedEmptyItems = 6 - relatedSong?.length;
      for (let i = 0; i < expectedEmptyItems; i++) {
        const emptyItem = screen.getByTestId(`song-related-empty-${i}`);
        expect(emptyItem).toBeInTheDocument();
      }
    }
  });
});
