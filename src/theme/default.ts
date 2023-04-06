import { extendTheme } from '@chakra-ui/react';

export const defaultTheme = extendTheme({
  colors: {
    heds: {
      100: '#9293FF',
      200: '#AC8FFF',
      300: '#C48CFF',
      400: '#DC89FF',
      500: '#26232D',
      600: '#17151C',
      700: '#745CBA'
    },
    button: {
      primary: '#745CBA',
      dark: '#4D4D4D',
      light: "#F6F6F6",
    }
  },
  fontFaces: {
    mono: "'Space Mono', monospace",
    inter: "'Inter', sans-serif",
    karla: "'Karla', sans-serif",
    poppins: "'Poppins', sans-serif",
  },
  styles: {
    global: {
      html: {
        bg: '#17151C',
      },
      body: {
        bg: '#17151C',
      },
    },
  },
});
