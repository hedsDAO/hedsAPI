import { SongDetails } from '@/components/GlobalAudio/components/SongDetails/SongDetails';
import { render, screen } from '@testing-library/react';
import { store } from '@/store';
import { globalAudioModelState } from '@/tests/mocks/models/globalAudioModelState';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { audioModelState } from '@/tests/mocks/models/audioModelState';
import { User } from '@/models/common';

describe('SongDetails unit', () => {
  beforeEach(() => {
    store.dispatch.globalAudioModel.setState(globalAudioModelState);
    store.dispatch.audioModel.setState(audioModelState);
    renderWithRematchStore(<SongDetails />, store);
  });

  it('renders the song name and artists for the current song', () => {
    const songName = screen.getByText(audioModelState.song.track_name);
    expect(songName).toBeInTheDocument();

    const songArtists = screen.getByText(audioModelState.song.artists.map((artist: User) => artist.display_name).join(', '));
    expect(songArtists).toBeInTheDocument();
  });
});
