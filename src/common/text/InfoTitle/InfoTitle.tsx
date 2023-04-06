import { Flex, Text } from '@chakra-ui/react';

const InfoTitle = ({ title }: { title: string }) => {
  return (
    <Text
      px={1}
      as={Flex}
      gap={1.5}
      mb={2.5}
      textTransform="uppercase"
      alignItems="center"
      fontWeight={'bold'}
      fontFamily="poppins"
      fontSize="sm"
      letterSpacing={'widest'}
      color="white"
    >
      {title}
    </Text>
  );
};

export default InfoTitle;
