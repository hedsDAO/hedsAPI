import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const connect = defineStyle({
  border: '1px solid',
  borderColor: 'heds.bg',
  fontFamily: 'karla',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  rounded: 'full',
  px: { base: 3, lg: 4 },
  py: { base: 1, lg: 3.5 },
  color: 'button.light',
});

const buttonTheme = defineStyleConfig({
  variants: { connect },
});

export default buttonTheme;
