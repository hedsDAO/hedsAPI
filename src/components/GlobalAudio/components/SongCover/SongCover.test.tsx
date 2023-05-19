import { SongCover } from '@/components/GlobalAudio/components/SongCover/SongCover';
import { render, screen } from '@testing-library/react';
import { store } from '@/store';
import { globalAudioModelState } from '@/tests/mocks/models/globalAudioModelState';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { audioModelState } from '@/tests/mocks/models/audioModelState';

describe('SongCover unit', () => {
  beforeEach(() => {
    store.dispatch.globalAudioModel.setState(globalAudioModelState);
    store.dispatch.audioModel.setState(audioModelState);
    renderWithRematchStore(<SongCover />, store);
  });

  it('renders skeleton when cover image is not loaded', () => {
    const skeleton = screen.getByTestId('ga-cover-image-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders the cover image of the current song', () => {
    const coverImage = screen.getByTestId('ga-cover-image');
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute('src', audioModelState.song.cover);
  });
});
