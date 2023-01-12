import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys);

const baseStyle = definePartsStyle({
  badge: {
    bg: '',
  },
  container: { bg: '#FAF9F6', p: '0.5px' },
  excessLabel: { bg: '#FAF9F6', fontSize: '0.65rem' },
});

const avatarTheme = defineMultiStyleConfig({ baseStyle });

export default avatarTheme;
