import { Box, Stack, Text } from '@chakra-ui/react';

const attributeColors: { [key: string]: string } = {
  ['KEY']: 'heds.bg3',
  ['TIME SIGNATURE']: 'heds.bg3',
  ['GENRE']: 'heds.bg3',
  ['SUBGENRE']: 'heds.bg3',
};

export const Attribute = ({ name, description }: { name?: string; description?: string }) => {
  return (
    <Box py={1.5} as={Stack} alignItems="center" px={6} rounded="lg" bg={attributeColors[name]}>
      <Text mt={'0 !important'} fontFamily="karla" fontWeight="light" color="white" fontSize="2xs" opacity={'75%'}>
        {name}
      </Text>
      <Text mt={'0 !important'} fontFamily="karla" fontWeight="bold" color="white" fontSize="xs" opacity={'80%'}>
        {description}
      </Text>
    </Box>
  );
};
