import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, screen } from '@testing-library/react';
import { ExploreArtistCard } from '@/pages/explore/components';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { mockArtist } from '@/tests/mocks/user/artist';

describe('ExploreArtistCard Unit', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    renderWithRematchStore(
      <Router location={history.location} navigator={history}>
        <ExploreArtistCard artist={mockArtist} />
      </Router>,
      store,
    );
  });

  beforeAll(() => {
    store.dispatch.artistModel.getAllArtists();
  });

  it('renders properly', () => {
    expect(screen.getByTestId('explore-artist-card')).toBeInTheDocument();
  });
  it('displays all text and image content', () => {
    const { displayName, profilePicture } = mockArtist;
    const artistCard = screen.getByTestId('explore-artist-card');
    const artistImage = screen.getByTestId('explore-artist-card-image');
    expect(artistCard).toHaveTextContent(displayName);
    expect(artistImage).toHaveAttribute('src', profilePicture);
  });
  it('navigates to artists page', async () => {
    const { wallet } = mockArtist;
    const seeAllArtistsButton = screen.getByTestId('explore-artist-card-button');
    await act(() => seeAllArtistsButton.click());
    expect(history.push).toHaveBeenCalledWith({ hash: '', pathname: `/u/${wallet}`, search: '' }, undefined);
  });
});
