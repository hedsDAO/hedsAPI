import { extendTheme } from '@chakra-ui/react';

export const defaultTheme = extendTheme({
  colors: {
    heds: {
      bg: '#FAF9F5',
      100: '#E5E5E5',
      200: '#FB8500',
      300: '#023047',
      400: '#FFB703',
      500: '#FB8500',
      //   text: '#000000',
      //   100: '#4299E1',
      //   101: '#9FC1E8',
      //   200: '#ED8936',
      //   201: '#F3C969',
      //   300: '#A63F55',
    },
  },
  fontFaces: {
    mono: "'Space Mono', monospace",
  },
  styles: {
    global: {
      html: {
        bg: 'heds.bg',
      },
      body: {
        bg: 'heds.bg',
      },
    },
  },
});
