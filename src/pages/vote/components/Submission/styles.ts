import { BoxProps, FlexProps, GridProps, ImageProps, ProgressProps, StackProps, TextProps } from '@chakra-ui/react';

export const $submissionsGridStyles: GridProps = {
  templateColumns: { base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
  gap: 1,
  pt: 4,
};

export const $submissionBoxStyles = (type: string): BoxProps => ({
  border: '1px',
  borderRadius: 'md',
  borderColor: '#9293FF',
  bg: `${type === 'track' ? '#745CBA' : type === 'selected' ? '#4F4F4F' : '#17141B'}`,
});

export const $cardStackStyles: StackProps = {
  flexDirection: 'row',
};

export const $cardImageBoxStyles: BoxProps = {
  p: 2,
};

export const $cardImageStyles: ImageProps = {
  minW: '3rem',
  minH: '3rem',
  boxSize: '3rem',
  borderRadius: 'md',
};

export const $cardFlexStyles: FlexProps = {
  w: 'full',
  direction: 'column',
  pl: 1,
  pr: 2,
};

export const $cardTextStyles: Record<string, TextProps> = {
  name: {
    mt: '-1px !important',
    fontSize: 'xs',
    color: '#DFDFDF',
    fontFamily: 'space',
  },
  artist: {
    fontSize: '2xs',
    textColor: '#FFFFFF',
    fontFamily: 'inter',
    letterSpacing: 'widest',
  },
  score: {
    mt: 1,
    fontSize: '2xs',
    textColor: 'white',
  },
};

export const $cardInnerFlexStyles: FlexProps = {
  mt: -0.5,
  minW: 'full',
  justifyContent: 'space-between',
};

export const $cardProgressStyles: ProgressProps = {
  mt: 1,
  size: 'sm',
  colorScheme: 'gray',
  borderRadius: 'md',
};
