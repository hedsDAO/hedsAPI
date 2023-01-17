import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, screen } from '@testing-library/react';
import { MostAppearances } from '@/pages/explore/components';
import { MOST_AP_BUTTON, MOST_AP_DESC, MOST_AP_TITLE } from '@/pages/explore/store/constants';
import { store } from '@/store';
import { mostFeaturedArtists } from '@/tests/mocks/explore/mostFeaturedArtists';
import { renderWithRematchStore } from '@/tests/utils/testUtils';

describe('MostAppearances Unit', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    renderWithRematchStore(
      <Router location={history.location} navigator={history}>
        <MostAppearances />
      </Router>,
      store,
    );
  });

  beforeAll(() => {
    store.dispatch.artistModel.setMostFeaturedArtists(mostFeaturedArtists);
  });

  it('renders properly', () => {
    expect(screen.getByTestId('explore-most-ap')).toBeInTheDocument();
  });
  it('displays all text content', () => {
    const mostAppearanceContainer = screen.getByTestId('explore-most-ap');
    [MOST_AP_BUTTON, MOST_AP_DESC, MOST_AP_TITLE].forEach((textValue) => {
      expect(mostAppearanceContainer).toHaveTextContent(textValue);
    });
  });
  it('navigates to artists page', async () => {
    const artistButton = screen.getByText(MOST_AP_BUTTON);
    await act(() => artistButton.click());
    expect(history.push).toHaveBeenCalledWith({ hash: '', pathname: '/artists', search: '' }, undefined);
  });
  it('displays artists card when top artists load', async () => {
    const tapeCountContainer = screen.getAllByRole('group')[0];
    expect(tapeCountContainer).toBeInTheDocument();
  });
});
