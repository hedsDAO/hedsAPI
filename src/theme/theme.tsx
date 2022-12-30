import { extendTheme } from '@chakra-ui/react';
import { avatarTheme } from './custom';
import { underlineHoverAnimationStyles, boxShadowStyles, gradientAnimationStyles, navbarStyles } from './styles';

export const theme = extendTheme({
  components: { Avatar: avatarTheme },
  styles: {
    global: (props: any) => ({
      'html, body': {
        background: props.colorMode === 'light' ? '#FAF9F6' : '#FAF9F6',
        height: 'auto',
        maxWidth: '100%',
        minWidth: '100vw',
        overflowX: 'hidden',
        overscrollBehavior: 'none !important',
      },
      ...underlineHoverAnimationStyles,
      ...boxShadowStyles,
      ...gradientAnimationStyles,
      ...navbarStyles,
    }),
  },
  config: { useSystemColorMode: false },
});
