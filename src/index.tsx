import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { configureChains, WagmiConfig, createClient } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { ChakraProvider } from '@chakra-ui/react';
import { defaultTheme } from './theme/default';
import { ModalWrapper } from '@/modals/components/ModalWrapper';
import { GlobalAudio } from '@/components/GlobalAudio/screens/GlobalAudio';
import { AudioControllerProvider } from '@/hooks/useAudio/models/AudioContext';
import { AuthWrapper } from './auth/components/AuthWrapper';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store } from './store';
import App from '@/App';
import * as gaEvents from './events';

import 'animate.css';
import './index.css';
import '../build/app/output.css';
import '@fontsource/space-mono';
import '@fontsource/inter';
import '@fontsource/poppins';
import '@fontsource/karla';

gaEvents.initGA();
gaEvents.setPageViewEvents();

const persistor = getPersistor();
const INFURA_PROVIDER_KEY = 'b8453c72aa7c484fb1efee0eed133fe6';
const WC_PROJECT_ID = 'd7f07ef372c401f9d0ff10c1ff07fbaf';
const INFURA_RPC_URL = 'https://mainnet.infura.io/v3/b8453c72aa7c484fb1efee0eed133fe6';

const WC_CONNECTOR = new WalletConnectConnector({ options: { qrcode: true, projectId: WC_PROJECT_ID } });
const COINBASE_CONNECTOR = new CoinbaseWalletConnector({ options: { appName: 'heds', jsonRpcUrl: INFURA_RPC_URL } });
const INJECTED_CONNECTOR = new InjectedConnector();

const { provider } = configureChains([mainnet], [infuraProvider({ apiKey: INFURA_PROVIDER_KEY, priority: 0 }), publicProvider({ priority: 1 })]);
const client = createClient({ provider, autoConnect: true, connectors: [INJECTED_CONNECTOR, COINBASE_CONNECTOR, WC_CONNECTOR] });

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
    <RematchProvider store={store}>
      <ChakraProvider theme={defaultTheme}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <AudioControllerProvider>
              <AuthWrapper>
                <ModalWrapper>
                  <GlobalAudio>
                    <App />
                  </GlobalAudio>
                </ModalWrapper>
              </AuthWrapper>
            </AudioControllerProvider>
          </BrowserRouter>
        </PersistGate>
      </ChakraProvider>
    </RematchProvider>
  </WagmiConfig>,
);
