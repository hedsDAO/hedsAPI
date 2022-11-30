import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      'html, body': {
        background: props.colorMode === 'light' ? 'white' : 'black',
      },
    }),
  },
  config: { useSystemColorMode: false },
});
