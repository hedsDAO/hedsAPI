import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      'html, body': {
        background: props.colorMode === 'light' ? '#FAF9F6' : '#2f2b2b',
      },
      p: {
        // fontFamily: `'Noto Sans Mono', monospace;`,
      },
    }),
    fonts: {
      body: `'Roboto Mono', monospace;`,
    },
  },
  config: { useSystemColorMode: false },
});
