import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys);

const baseStyle = definePartsStyle({
  badge: {
    color: 'gray.800',
    p: '1px',
    bg: 'black',
    borderColor: 'gray.800',
    border: '1px',
  },
  container: {
    color: 'white',
    bg: 'black',
    borderColor: 'gray.600',
    border: '0px',
    p: '1px',
  },
  excessLabel: {
    textColor: 'white',
    color: 'white',
    bg: 'white',
    p: '0.5px',
    fontSize: '0.65rem',
    borderColor: 'gray.800',
    border: '0.5px',
  },
});

const avatarTheme = defineMultiStyleConfig({
  baseStyle: baseStyle,
});

export default avatarTheme;
