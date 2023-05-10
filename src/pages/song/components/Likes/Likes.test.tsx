import { Likes } from '@/pages/song/components/Likes/Likes';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { songModelState } from '@/tests/mocks/models/songModelState';
import { screen } from '@testing-library/react';

describe('Likes unit', () => {
  beforeEach(() => {
    store.dispatch.songModel.setState(songModelState);
    store.dispatch.paginationModel.setState({ currentPage: 0, itemsPerPage: 6 });
    renderWithRematchStore(
      <Router>
        <Likes />
      </Router>,
      store,
    );
  });
  it('renders song like grid', () => {
    const trackItems = screen.getByTestId('song-likes-grid');
    expect(trackItems).toBeInTheDocument();
  });
  it('renders all like grid items', () => {
    const likedSong = songModelState.likes;
    for (let i = 0; i < likedSong.length; i++) {
      const likedItem = screen.getByTestId(`song-likes-${i}`);
      expect(likedItem).toBeInTheDocument();
    }
  });
  it('renders empty like grid items', () => {
    const likedSong = songModelState.likes;
    if (likedSong?.length < 6) {
      const expectedEmptyItems = 6 - likedSong?.length;
      for (let i = 0; i < expectedEmptyItems; i++) {
        const emptyItem = screen.getByTestId(`song-likes-empty-${i}`);
        expect(emptyItem).toBeInTheDocument();
      }
    }
  });
});
