import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const explore = defineStyle({
  border: '1px solid',
  borderColor: 'black',
  borderRadius: '3xl',
  fontFamily: '"Space Mono", monospace',
  fontSize: 'xs',
  textTransform: 'uppercase',
  textColor: 'gray.500',
  bg: 'white',
  _hover: {
    bg: 'gray.100',
    textColor: 'gray.800',
  },
  px: {
    base: '4',
    lg: '8',
  },
});

const buttonTheme = defineStyleConfig({
  variants: { explore },
});

export default buttonTheme;
