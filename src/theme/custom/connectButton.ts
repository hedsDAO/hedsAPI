import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const connect = defineStyle({
  border: '1px solid',
  borderColor: 'heds.100',
  fontFamily: 'karla',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  rounded: 'full',
  px: { base: 4, lg: 6 },
  py: { base: 1, lg: 3.5 },
  color: 'heds.100',
});

const buttonTheme = defineStyleConfig({
  variants: { connect },
});

export default buttonTheme;
