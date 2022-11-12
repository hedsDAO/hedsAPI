import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { ChakraProvider } from '@chakra-ui/react';
import { DisplayNameWrapper, TapeWrapper } from '@/common/wrappers';
import { ModalWrapper } from '@/modules/modals/components';
import { AudioWrapper } from '@/modules/audio/components';
import { store } from './store';
import App from '@/App';

import 'animate.css';
import './index.css';
import '../build/app/output.css';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [infuraProvider({ apiKey: process.env.INFURA_PROVIDER_KEY, priority: 0 }), publicProvider({ priority: 1 })],
);
const client = createClient({
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  autoConnect: true,
  provider,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
    <RematchProvider store={store}>
      <ChakraProvider>
        <TapeWrapper>
          <AudioWrapper>
            <BrowserRouter>
              <ModalWrapper>
                <DisplayNameWrapper>
                  <App />
                </DisplayNameWrapper>
              </ModalWrapper>
            </BrowserRouter>
          </AudioWrapper>
        </TapeWrapper>
      </ChakraProvider>
    </RematchProvider>
  </WagmiConfig>,
);
