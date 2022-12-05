import { extendTheme } from '@chakra-ui/react';
import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys);

const baseStyle = definePartsStyle({
  badge: { bg: 'white' },
  container: { bg: 'white' },
});

const avatarTheme = defineMultiStyleConfig({ baseStyle });

export const theme = extendTheme({
  components: { Avatar: avatarTheme },
  styles: {
    global: (props: any) => ({
      'html, body': {
        background: props.colorMode === 'light' ? '#FAF9F6' : '#2f2b2b',
      },
    }),
    fonts: {
      body: `'Roboto Mono', monospace;`,
    },
  },
  config: { useSystemColorMode: false },
});
