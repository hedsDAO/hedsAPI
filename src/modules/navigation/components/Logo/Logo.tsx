import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Logo = ({ text }: { text: string }) => {
  return (
    <Flex alignItems={'baseline'} gap={4} mr={1}>
      <Link className="inline relative -top-[1px] md:top-0.5" to="/">
        <Text color={'gray.700'} fontSize={{ base: '2xl', md: '4xl' }} fontWeight={'medium'} letterSpacing="wide">
          {text}
        </Text>
      </Link>
    </Flex>
  );
};

export default Logo;
