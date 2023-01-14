import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys);

const baseStyle = definePartsStyle({
  badge: { color: 'gray.800', p: '0.5px', bg: 'black', borderColor: 'gray.600', border: '0.5px' },
  container: { color: 'gray.800', bg: 'black', p: '0.5px', borderColor: 'gray.600', border: '0.5px' },
  excessLabel: { color: 'gray.800', bg: 'black', p: '0.5px', fontSize: '0.65rem', borderColor: 'gray.600', border: '0.5px' },
});

const avatarTheme = defineMultiStyleConfig({
  baseStyle: baseStyle,
});

export default avatarTheme;
