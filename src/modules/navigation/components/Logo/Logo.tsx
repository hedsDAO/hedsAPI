import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Logo = ({ text }: { text: string }) => {
  return (
    <Flex alignItems={'end'} gap={4} mr={1}>
      <Link className="" to="/">
        <Text color={'gray.700'} fontSize={{ base: '2xl', lg: '4xl' }} fontWeight={'medium'} letterSpacing="wide">
          {text}
        </Text>
      </Link>
    </Flex>
  );
};

export default Logo;
