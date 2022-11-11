import { screen } from '@testing-library/react';
import { store } from '@/store';
import { Collection } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { configureChains, chain, WagmiConfig, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
const { provider, webSocketProvider } = configureChains([chain.mainnet], [publicProvider()]);
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

describe('Collection Unit', () => {
  beforeAll(() => store.dispatch.userModel.setUserData(userData));
  beforeEach(() =>
    renderWithRematchStore(
      <WagmiConfig client={client}>
        <Collection />
      </WagmiConfig>,
      store,
    ),
  );
  it('renders collections', () => {
    const userCollectionContainer = screen.getByTestId('user-collection-container');
    const userCollectionItem = screen.getByTestId('user-collection-1');
    expect(userCollectionContainer).toBeTruthy();
    expect(userCollectionItem).toBeTruthy();
  });
  it('renders correct collection info', () => {
    const userCollectionContainer = screen.getByTestId('user-collection-container');
    const { collection } = userData;
    const firstKey = Object.keys(collection)[0];
    expect(userCollectionContainer).toHaveTextContent(collection[firstKey].name);
    expect(userCollectionContainer).toHaveTextContent(collection[firstKey].quantity.toString());
  });
});
