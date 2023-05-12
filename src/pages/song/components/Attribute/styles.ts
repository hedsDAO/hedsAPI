import { BoxProps, Stack, TextProps } from '@chakra-ui/react';

interface ExtendedTextProps extends TextProps {
  'data-testid'?: string;
}

export const attributeColors: { [key: string]: string } = {
  ['KEY']: 'heds.bg3',
  ['TIME SIGNATURE']: 'heds.bg3',
  ['GENRE']: 'heds.bg3',
  ['SUBGENRE']: 'heds.bg3',
};

export const $attributeBoxStyles: (name?: string) => BoxProps = (name) => ({
  py: 1.5,
  as: Stack,
  alignItems: 'center',
  px: 6,
  rounded: 'lg',
  bg: attributeColors[name || ''],
});

export const $attributeNameTextStyles: ExtendedTextProps = {
  mt: '0 !important',
  fontFamily: 'karla',
  fontWeight: 'light',
  color: 'white',
  fontSize: '2xs',
  opacity: '75%',
  'data-testid': 'attribute-name',
};

export const $attributeDescriptionTextStyles: ExtendedTextProps = {
  mt: '0 !important',
  fontFamily: 'karla',
  fontWeight: 'bold',
  color: 'white',
  fontSize: 'xs',
  opacity: '80%',
  'data-testid': 'attribute-description',
};
