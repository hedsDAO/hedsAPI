import '@/tests/mocks/common/MockIntersectionObserver';
import '@/tests/mocks/common/MockNavigator';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '@/pages/song/components/Header/Header';
import { ARTIST_HEADER_TEXT } from '@/pages/song/models/constants';
import { store } from '@/store';
import { songModelState } from '@/tests/mocks/models/songModelState';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { fireEvent, screen } from '@testing-library/react';

describe('Header unit', () => {
  const handlePlayPauseMock = jest.fn();

  beforeEach(() => {
    store.dispatch.songModel.setState(songModelState);
    renderWithRematchStore(
      <Router>
        <Header handlePlayPause={handlePlayPauseMock} />
      </Router>,
      store,
    );
  });

  it('renders the artist label', () => {
    const artistLabel = screen.getByText(ARTIST_HEADER_TEXT);
    expect(artistLabel).toBeInTheDocument();
  });

  it('renders the play/pause button', () => {
    const playPauseButton = screen.getByTestId('song-play-pause-button');
    expect(playPauseButton).toBeInTheDocument();
  });

  it('renders the like button', () => {
    const likeButton = screen.getByTestId('song-like-button');
    expect(likeButton).toBeInTheDocument();
  });

  it('triggers handlePlayPause on play/pause button click', () => {
    const playPauseButton = screen.getByTestId('song-play-pause-button');
    fireEvent.click(playPauseButton);
    expect(handlePlayPauseMock).toHaveBeenCalledTimes(1);
  });
});
