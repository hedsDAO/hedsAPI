import { act, screen } from '@testing-library/react';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { UserAuthWrapper } from '@modals/screens/submit/components';
import { Modals } from '@/modules/modals/store/modalModel';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureChains, chain, WagmiConfig, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { provider, webSocketProvider } = configureChains([chain.mainnet], [publicProvider()]);
const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
});

describe('UserAuthWrapper Unit', () => {
  beforeEach(() =>
    renderWithRematchStore(
      <WagmiConfig client={client}>
        <Router>
          <UserAuthWrapper>
            <div data-testid="validated" />
          </UserAuthWrapper>
        </Router>
      </WagmiConfig>,
      store,
    ),
  );
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.userModel.setUserData(userData);
  });
  it('renders connect button when not connected', async () => {
    await act(() => {
      store.dispatch.userModel.setUserData(userData);
    });
    const connectButton = screen.getByRole('button');
    expect(connectButton).toHaveTextContent('connect');
  });
});
