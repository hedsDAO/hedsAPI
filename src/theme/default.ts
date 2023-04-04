import { extendTheme } from '@chakra-ui/react';

export const defaultTheme = extendTheme({
  colors: {
    blue: {
      primary: '#89CFF0',
      light: '#B2E2FA',
      dark: '#6196B3',
    },
    orange: {
      primary: '#FFC48C',
      light: '#FFE0B5',
      dark: '#D49A6A',
    },
    white: {
      pure: '#FFFFFF',
      off: '#F5F5F5',
    },
    black: {
      pure: '#000000',
      darkGray: '#333333',
      lightGray: '#999999',
    },
    containerBg: {
      light: '#F2F2F2',
      medium: '#E0E0E0',
      dark: '#BEBEBE',
    },
  },
  fontFaces: {
    mono: "'Space Mono', monospace",
    inter: "'Inter', sans-serif",
  },
  styles: {
    global: {
      html: {
        bg: '',
      },
      body: {
        bg: 'heds.bg',
      },
    },
  },
});
