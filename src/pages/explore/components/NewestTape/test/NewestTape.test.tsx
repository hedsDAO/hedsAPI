import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, screen } from '@testing-library/react';
import { NewestTape } from '@/pages/explore/components';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { BOX_ONE_DATE, BOX_ONE_DESC, BOX_ONE_TITLE, BOX_TWO_DESC, NEWEST_TAPE_ARTIST, NEWEST_TAPE_HEADING } from '@/pages/explore/store/constants';

describe('NewestTape Unit', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    renderWithRematchStore(
      <Router location={history.location} navigator={history}>
        <NewestTape />
      </Router>,
      store,
    );
  });

  beforeAll(() => {
    store.dispatch.artistModel.getAllArtists();
  });

  it('renders properly', () => {
    expect(screen.getByTestId('explore-newest-tape')).toBeInTheDocument();
  });
  it('displays all text content', () => {
    const newestTapeContainer = screen.getByTestId('explore-newest-tape');
    [BOX_ONE_DATE, BOX_ONE_DESC, BOX_ONE_TITLE, BOX_TWO_DESC, NEWEST_TAPE_HEADING].forEach((text) => {
      expect(newestTapeContainer).toHaveTextContent(text);
    });
  });
  it('navigates to artists page', async () => {
    const artistButton = screen.getByTestId('newest-tape-artist-button');
    await act(() => artistButton.click());
    expect(history.push).toHaveBeenCalledWith({ hash: '', pathname: `/u/${NEWEST_TAPE_ARTIST}`, search: '' }, undefined);
  });
});
