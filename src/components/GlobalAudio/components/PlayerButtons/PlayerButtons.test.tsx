import { PlayerButtons } from '@/components/GlobalAudio/components/PlayerButtons/PlayerButtons';
import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@/store';
import { globalAudioModelState } from '@/tests/mocks/models/globalAudioModelState';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';

describe('PlayerButtons unit', () => {

  beforeEach(() => {
    store.dispatch.globalAudioModel.setState(globalAudioModelState);
    renderWithRematchStore(
      <Router>
        <PlayerButtons />
      </Router>,
      store,
    );
  });

  it('renders backward, play/pause, and forward buttons', () => {
    const backwardButton = screen.getByTestId('ga-backward-button');
    expect(backwardButton).toBeInTheDocument();

    const playPauseButton = screen.getByTestId('ga-play-pause-button');
    expect(playPauseButton).toBeInTheDocument();

    const forwardButton = screen.getByTestId('ga-forward-button');
    expect(forwardButton).toBeInTheDocument();
  });
});
