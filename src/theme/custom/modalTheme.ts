import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'heds.500',
    opacity: '10%',
  },
  dialog: {
    bg: 'heds.bg',
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});

export default modalTheme;
