import { Spotlight } from '@/pages/user/components/Spotlight';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModel';
import { screen } from '@testing-library/react';

describe('Spotlight unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState({
      ...userModelState,
    });
    renderWithRematchStore(<Spotlight />, store);
  });

  it('renders the spotlight cover image', () => {
    const spotlightCover = screen.getByAltText('spotlight cover');
    expect(spotlightCover).toBeInTheDocument();
    expect(spotlightCover).toHaveAttribute('src', 'https://www.heds.cloud/ipfs/QmNrmpMNpoVVa5ized1eCWqFnWNsxeKZaA5W9HphEDLjKh');
  });

  it('renders the spotlight submission data', () => {
    const spotlightSubId = screen.getByTestId('spotlight-track-name');
    const spotlightArtist = screen.getByTestId('spotlight-artist-name');
    expect(spotlightSubId).toBeInTheDocument();
    expect(spotlightArtist).toBeInTheDocument();
  });
});
