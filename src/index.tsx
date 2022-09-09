import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { WagmiConfig, chain, createClient } from 'wagmi';
import { ChakraProvider } from '@chakra-ui/react';
import ProfileWrapper from './wrappers/ProfileWrapper';
import ModalWrapper from './wrappers/ModalWrapper';
import AlertWrapper from './wrappers/AlertWrapper';
import { store } from './store';
import App from './App';
import './index.css';
import '../build/app/output.css';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

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
          <ProfileWrapper>
            <ModalWrapper>
              <AlertWrapper>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </AlertWrapper>
            </ModalWrapper>
          </ProfileWrapper>
        </ChakraProvider>
      </RematchProvider>
    </ConnectKitProvider>
  </WagmiConfig>,
);
