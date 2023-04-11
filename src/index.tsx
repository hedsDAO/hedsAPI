import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { configureChains, WagmiConfig, createClient } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { ChakraProvider } from '@chakra-ui/react';
import { defaultTheme } from './theme/default';
import { ModalWrapper } from '@components/Modals/components/ModalWrapper';
import { store } from './store';
import App from '@/App';
import * as gaEvents from './events';

import 'animate.css';
import './index.css';
import '../build/app/output.css';
import '@fontsource/roboto-mono';
import '@fontsource/noto-sans-mono';
import '@fontsource/space-mono';
import '@fontsource/inter';

gaEvents.initGA();
gaEvents.setPageViewEvents();

const INFURA_PROVIDER_KEY = 'b8453c72aa7c484fb1efee0eed133fe6';
const { provider } = configureChains([mainnet], [infuraProvider({ apiKey: INFURA_PROVIDER_KEY, priority: 0 }), publicProvider({ priority: 1 })]);
const client = createClient(
  getDefaultClient({
    appName: 'heds',
    provider,
    chains: [mainnet],
    autoConnect: true,
  }),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
    <ConnectKitProvider>
      <RematchProvider store={store}>
        <ChakraProvider theme={defaultTheme}>
          <BrowserRouter>
            <ModalWrapper>
              <App />
            </ModalWrapper>
          </BrowserRouter>
        </ChakraProvider>
      </RematchProvider>
    </ConnectKitProvider>
  </WagmiConfig>,
);
