import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { configureChains, WagmiConfig, createClient } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { TapeWrapper, UserWrapper } from '@/modules/wrappers';
import { ModalWrapper } from '@/modules/modals/components';
import { AudioWrapper } from './modules/audio/components';
import { store } from './store';
import { theme } from './theme/theme';
import ReactGA from 'react-ga4';
import * as gaEvents from './events';
import App from '@/App';

import 'animate.css';
import './index.css';
import '../build/app/output.css';
import '@fontsource/roboto-mono';
import '@fontsource/noto-sans-mono';
import '@fontsource/space-mono';

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

const initializeLightDarkMode = <ColorModeScript initialColorMode={theme.config.initialColorMode} />;

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
    <ConnectKitProvider>
      <RematchProvider store={store}>
        <ChakraProvider theme={theme}>
          {initializeLightDarkMode}
          <BrowserRouter>
            <TapeWrapper>
              <UserWrapper>
                <AudioWrapper>
                  <ModalWrapper>
                    <App />
                  </ModalWrapper>
                </AudioWrapper>
              </UserWrapper>
            </TapeWrapper>
          </BrowserRouter>
        </ChakraProvider>
      </RematchProvider>
    </ConnectKitProvider>
  </WagmiConfig>,
);
