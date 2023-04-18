import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys);

const user = definePartsStyle({
  badge: {
    color: 'gray.200',
    p: '1px',
    bg: 'heds.bg',
    borderColor: 'heds.bg',
    border: '2px',
  },
  container: {
    color: 'heds.bg',
    bg: 'heds.bg',
    borderColor: 'heds.bg',
    border: '0px',
    p: '1px',
  },
  excessLabel: {
    textColor: 'white',
    color: 'white',
    bg: 'white',
    p: '0.5px',
    // fontSize: '0.65rem',
    borderColor: 'heds.bg',
    border: '0.5px',
  },
});

const avatarTheme = defineMultiStyleConfig({
  variants: { user },
});

export default avatarTheme;
