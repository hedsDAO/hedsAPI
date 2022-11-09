import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { WagmiConfig, chain, createClient } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';
import { TapeWrapper } from '@/common/wrappers';
import { ModalWrapper } from '@/modules/modals/components';
import { AudioWrapper } from '@/modules/audio/components';
import App from '@/App';

import 'animate.css';
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
            <AudioWrapper>
              <BrowserRouter>
                <ModalWrapper>
                  <App />
                </ModalWrapper>
              </BrowserRouter>
            </AudioWrapper>
          </TapeWrapper>
        </ChakraProvider>
      </RematchProvider>
    </ConnectKitProvider>
  </WagmiConfig>,
);
