import { Waveform } from '@/pages/song/components/Waveform/Waveform';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { songModelState } from '@/tests/mocks/models/songModelState';
import { screen } from '@testing-library/react';

describe('Waveform unit', () => {
  beforeEach(() => {
    store.dispatch.songModel.setState(songModelState);
    renderWithRematchStore(<Waveform />, store);
  });
  it('renders song waveform container', () => {
    const waveformContainer = screen.getByTestId('song-waveform-box');
    expect(waveformContainer).toBeInTheDocument();
  });
  it('renders song waveform', () => {
    const waveform = screen.getByTestId('song-waveform');
    expect(waveform).toBeInTheDocument();
  });
});
