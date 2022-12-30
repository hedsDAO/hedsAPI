import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys);

const baseStyle = definePartsStyle({
  badge: { bg: '' },
  container: { bg: '#FAF9F6', p: 0.5 },
  excessLabel: { bg: '#FAF9F6' },
});

const avatarTheme = defineMultiStyleConfig({ baseStyle });

export default avatarTheme;
