import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const connect = defineStyle({
  fontFamily: 'karla',
  fontSize: 'sm',
  // bg: "button.primary",
  fontWeight: 'light',
  letterSpacing: 'widest',
  // textTransform: 'uppercase',
  rounded: 'full',
  px: { base: 3, lg: 4 },
  py: { base: 1, lg: 1 },
  color: 'white',
});

const buttonTheme = defineStyleConfig({
  variants: { connect },
});

export default buttonTheme;
