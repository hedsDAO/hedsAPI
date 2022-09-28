import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { WagmiConfig, chain, createClient } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';

import ModalWrapper from '@/common/components/wrappers/ModalWrapper';
import TapeWrapper from '@/common/components/wrappers/TapeWrapper';
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
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ModalWrapper>
          </TapeWrapper>
        </ChakraProvider>
      </RematchProvider>
    </ConnectKitProvider>
  </WagmiConfig>,
);
