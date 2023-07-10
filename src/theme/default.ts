import { extendTheme } from '@chakra-ui/react';
import buttonTheme from '@/theme/custom/connectButton';
import modalTheme from './custom/modalTheme';
import avatarTheme from './custom/avatarTheme';
import gradientAnimations from './styles/gradientAnimations';

export const defaultTheme = extendTheme({
  components: { Button: buttonTheme, Modal: modalTheme, Avatar: avatarTheme },
  colors: {
    heds: {
      bg: '#17151C',
      bg2: '#27252B',
      bg3: '#201C27',
      bg4: '#060212',
      bg5: '#686868',
      bg6: '#1F1C26',
      bg7: '#26232D',
      bg8: '#373737',
      100: '#9293FF',
      200: '#AC8FFF',
      300: '#C48CFF',
      400: '#DC89FF',
      500: '#26232D',
      600: '#17151C',
      700: '#745CBA',
      800: '#CDCDCD',
    },
    button: {
      primary: '#745CBA',
      dark: '#4D4D4D',
      light: '#F6F6F6',
    },
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
  fonts: {
    space: "'Space Mono', sans-serif",
    inter: "'Inter', sans-serif",
    karla: "'Karla', sans-serif",
    poppins: "'Poppins', sans-serif",
  },
  styles: {
    global: (props: any) => ({
      'html, body': {
        background: 'heds.bg',
        height: '100%',
        maxWidth: '100vw',
        overscrollBehavior: 'none !important',
      },
      '.marquee': {
        minWidth: 'unset',
      },
      '.chakra-input[type="search"]::-webkit-search-cancel-button': {
        display: 'none',
      },
      '.highlight': {
        '.ais-Highlight-highlighted': {
          backgroundColor: 'heds.bg3',
          color: 'white',
          fontStyle: 'normal',
        },
      },
      ...gradientAnimations,
    }),
  },
});
