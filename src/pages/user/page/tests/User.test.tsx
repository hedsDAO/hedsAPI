import { User } from '@/pages/user/page/User';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { userData } from '@/tests/mocks/UserData';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureChains, chain, WagmiConfig, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
const { provider, webSocketProvider } = configureChains([chain.mainnet], [publicProvider()]);
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

describe('User unit', () => {
  beforeAll(async () => {
    await store.dispatch.userModel.setUserData(userData);
  });
  describe('snapshot', () => {
    test('snapshot', async () => {
      const snapshot = renderWithRematchStore(
        <WagmiConfig client={client}>
          <Router>
            <User />
          </Router>
        </WagmiConfig>,
        store,
      );
      expect(snapshot).toMatchSnapshot();
    });
  });
});
