import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { WagmiConfig, chain, createClient } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';
import { TapeWrapper } from '@/common/wrappers';
import { ModalWrapper } from '@/modules/modals/global/components';
import { AudioWrapper } from '@/modules/audio/global/components';
import App from '@/App';

import './index.css';
import '../build/app/output.css';

const infuraId = process.env.INFURA_PROVIDER_KEY;
const chains = [chain.mainnet];

const client = createClient(
  getDefaultClient({
    chains,
    appName: 'Your App Name',
    infuraId,
  }),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
    <ConnectKitProvider>
      <RematchProvider store={store}>
        <ChakraProvider>
          <TapeWrapper>
            <ModalWrapper>
              <AudioWrapper>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </AudioWrapper>
            </ModalWrapper>
          </TapeWrapper>
        </ChakraProvider>
      </RematchProvider>
    </ConnectKitProvider>
  </WagmiConfig>,
);
