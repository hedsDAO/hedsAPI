import { Flex, Text } from '@chakra-ui/react';

const InfoPair = ({ label, value, inline }: { label: string; value: string; inline: boolean }) => {
  return (
    <Flex w="full" mt={'0 !important'} gap={inline ? 2 : 0} alignItems={'baseline'} direction={inline ? 'row' : 'column'}>
      <Text fontFamily={'inter'} textTransform={'uppercase'} letterSpacing={'widest'} fontSize={'2xs'} fontWeight="semibold" color={'blackAlpha.700'}>
        {label}:
      </Text>
      <Text mt={'0 !important'} fontFamily={'inter'} letterSpacing={'widest'} fontSize={'xs'} fontWeight="tight" color={'blackAlpha.700'}>
        {value}
      </Text>
    </Flex>
  );
};

export default InfoPair;
