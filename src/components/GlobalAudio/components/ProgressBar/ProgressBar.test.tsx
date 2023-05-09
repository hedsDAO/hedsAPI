import { ProgressBar } from '@/components/GlobalAudio/components/ProgressBar/ProgressBar';
import { screen } from '@testing-library/react';
import { store } from '@/store';
import { globalAudioModelState } from '@/tests/mocks/models/globalAudioModelState';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { audioModelState } from '@/tests/mocks/models/audioModelState';

describe('ProgressBar unit', () => {
  beforeEach(() => {
    store.dispatch.globalAudioModel.setState(globalAudioModelState);
    store.dispatch.audioModel.setState(audioModelState);
    renderWithRematchStore(<ProgressBar />, store);
  });

  it('renders the slider when song is playing in overlay', () => {
    const slider = screen.getByTestId('ga-progress-slider');
    expect(slider).toBeInTheDocument();
  });
  // TODO: mock hooks for the audioController to test elapsed duration in progress bar.
});
