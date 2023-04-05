import { Flex, Text } from '@chakra-ui/react';

const InfoTitle = ({ title }: { title: string }) => {
  return (
    <Text
      px={1}
      as={Flex}
      gap={1.5}
      mb={3}
      textTransform="uppercase"
      alignItems="center"
      fontWeight={'medium'}
      fontFamily="inter"
      fontSize="sm"
      letterSpacing={'widest'}
      color="blackAlpha.800"
    >
      {title}
    </Text>
  );
};

export default InfoTitle;
