import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {},
  thumb: {
    bg: 'black',
    border: '1px solid',
    borderColor: 'black',
  },
  track: {
    border: '1px',
    borderColor: 'black',
    bg: 'white',
    _checked: {
      bg: 'gray.200',
      borderColor: 'black',
    },
  },
});

const switchTheme = defineMultiStyleConfig({ baseStyle });

export default switchTheme;
