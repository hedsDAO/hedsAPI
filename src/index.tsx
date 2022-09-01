import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { WagmiConfig, configureChains, chain, createClient } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import ProfileWrapper from './wrappers/ProfileWrapper';
import ModalWrapper from './wrappers/ModalWrapper';
import AlertWrapper from './wrappers/AlertWrapper';
import { store } from './store';
import App from './App';
import './index.css';
import '../build/app/output.css';

const { provider } = configureChains([chain.mainnet], [infuraProvider({ apiKey: process.env.INFURA_PROVIDER_KEY })]);
const client = createClient({ autoConnect: true, provider });

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
    <RematchProvider store={store}>
      <ProfileWrapper>
        <ModalWrapper>
          <AlertWrapper>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AlertWrapper>
        </ModalWrapper>
      </ProfileWrapper>
    </RematchProvider>
  </WagmiConfig>,
);
