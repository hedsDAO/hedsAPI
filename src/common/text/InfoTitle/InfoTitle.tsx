import { Text } from '@chakra-ui/react';

const InfoTitle = ({ title }: { title: string }) => {
  return (
    <Text mb={4} letterSpacing={'widest'} fontSize={'md'} fontWeight="semibold" color={'blackAlpha.700'}>
      {title}
    </Text>
  );
};

export default InfoTitle;