import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { ActiveListings } from '@/pages/explore/components';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { secondaryListings } from '@/tests/mocks/explore/secondaryListings';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet } from 'wagmi/chains';
import { LISTINGS_BUTTON, LISTINGS_DESC, LISTINGS_TITLE } from '@/pages/explore/store/constants';
import { ChakraProvider } from '@chakra-ui/react';

const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()]);
const client = createClient({ provider, webSocketProvider });

describe('ActiveListings Unit', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    renderWithRematchStore(
      <ChakraProvider>
        <WagmiConfig client={client}>
          <Router location={history.location} navigator={history}>
            <ActiveListings />
          </Router>
        </WagmiConfig>
      </ChakraProvider>,
      store,
    );
  });

  beforeAll(() => {
    store.dispatch.exploreModel.setLatestSecondaryListings(secondaryListings);
  });

  it('renders properly', () => {
    expect(screen.getByTestId('explore-listings')).toBeInTheDocument();
  });
  it('displays all text content', () => {
    const newestTapeContainer = screen.getByTestId('explore-listings');
    [LISTINGS_BUTTON, LISTINGS_DESC, LISTINGS_TITLE].forEach((text) => {
      expect(newestTapeContainer).toHaveTextContent(text);
    });
  });
  it('display all listing images and text content', () => {
    const listingContainer = screen.getByTestId('explore-listings-container');
    secondaryListings.slice(0, 4).forEach((listing, index) => {
      const listingImage = screen.getByTestId(`explore-listing-image-${index}`);
      expect(listingImage).toHaveAttribute('src', listing.image);
      expect(listingContainer).toHaveTextContent(listing.name);
      expect(listingContainer).toHaveTextContent(listing.tokenId);
      expect(listingContainer).toHaveTextContent(listing.price);
    });
  });
});
