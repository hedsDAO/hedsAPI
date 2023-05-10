import { AppearsOn } from '@/pages/song/components/AppearsOn/AppearsOn';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { songModelState } from '@/tests/mocks/models/songModelState';
import { screen } from '@testing-library/react';

describe('AppearsOn unit', () => {
  beforeEach(() => {
    store.dispatch.songModel.setState(songModelState);
    store.dispatch.paginationModel.setState({ currentPage: 0, itemsPerPage: 6 });
    renderWithRematchStore(<AppearsOn />, store);
  });
  it('renders all appears on grid items', () => {
    const trackItems = screen.getAllByTestId('song-appears-on');
    expect(trackItems).toHaveLength(6);
  });
  it('renders the correct text and image for the appeared on tape', () => {
    const tapeName = songModelState.song?.track_data?.tape_name;
    const cover = songModelState?.song?.cover;
    const tapeText = screen.getAllByText(tapeName);
    const tapeCover = screen.getByTestId('song-appears-on-image');
    expect(tapeText[0]).toHaveTextContent(tapeName);
    expect(tapeCover).toHaveAttribute('src', cover);
  });
});
