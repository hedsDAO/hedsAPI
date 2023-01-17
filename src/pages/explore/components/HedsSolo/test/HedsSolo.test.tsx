import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, screen } from '@testing-library/react';
import { HedsSolo } from '@/pages/explore/components';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { HEDS_SOLO_ARTIST, HEDS_SOLO_HEADING, HEDS_SOLO_DESC, HEDS_SOLO_TITLE } from '@/pages/explore/store/constants';

describe('HedsSolo Unit', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    renderWithRematchStore(
      <Router location={history.location} navigator={history}>
        <HedsSolo />
      </Router>,
      store,
    );
  });

  beforeAll(() => {
    store.dispatch.artistModel.getAllArtists();
  });

  it('renders properly', () => {
    expect(screen.getByTestId('explore-hedsolo')).toBeInTheDocument();
  });
  it('displays all text content', () => {
    const newestTapeContainer = screen.getByTestId('explore-hedsolo');
    [HEDS_SOLO_DESC, HEDS_SOLO_HEADING, HEDS_SOLO_TITLE].forEach((text) => {
      expect(newestTapeContainer).toHaveTextContent(text);
    });
  });
  it('navigates to artists page', async () => {
    const seeAllArtistsButton = screen.getByTestId('hedsolo-artist-button');
    await act(() => seeAllArtistsButton.click());
    expect(history.push).toHaveBeenCalledWith({ hash: '', pathname: `/u/${HEDS_SOLO_ARTIST}`, search: '' }, undefined);
  });
});
