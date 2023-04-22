import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Button, Flex, Link, Stack, Text } from '@chakra-ui/react';

export const Details = () => {
  const display_name = useSelector(store.select.userModel.selectDisplayName);
  const description = useSelector(store.select.userModel.selectDescription);
  const twitter_handle = useSelector(store.select.userModel.selectTwitterHandle);
  const wallet = useSelector(store.select.userModel.selectWallet);

  return (
    <Stack alignItems={{ base: 'center', lg: 'start' }}>
      <Flex mt={{ base: '0 !important', lg: 0 }} gap={2} alignItems="center">
        <Text fontFamily={'poppins'} fontWeight="bold" color="white" fontSize="4xl">
          {display_name}
        </Text>
        {twitter_handle && (
          <Button
            data-testid="twitter-button"
            display={{ base: 'none', lg: 'flex' }}
            as={Link}
            mb={{ base: '-1 !important', lg: '-1 !important' }}
            rounded="full"
            target="_blank"
            _hover={{ bg: 'heds.300', color: 'heds.bg' }}
            border="solid 1px"
            color="heds.300"
            bg="heds.bg2"
            href={`https://www.twitter.com/${twitter_handle}`}
            borderColor="transparent"
            size="xs"
            px={0}
          >
            <i className="fa-brands fa-twitter"></i>
          </Button>
        )}
      </Flex>
      <Flex mt={{ base: '-4 !important', xl: '-2 !important' }} gap={0.5} alignItems={'end'}>
        <Text
          p={{ base: 4, lg: 0 }}
          textAlign={{ base: 'center', lg: 'start' }}
          maxW="65ch"
          mt="2 !important"
          fontFamily={'inter'}
          fontSize="sm"
          color="white"
          opacity={'60%'}
        >
          {description}
        </Text>
      </Flex>
      <Flex gap={1} alignItems={'baseline'}>
        <Button
          data-testid="twitter-button"
          display={{ base: 'flex', lg: 'none' }}
          as={Link}
          mb={{ base: '0 !important', lg: '-1 !important' }}
          rounded="full"
          target="_blank"
          _hover={{ bg: 'heds.300', color: 'heds.bg' }}
          border="solid 1px"
          color="heds.300"
          bg="heds.bg2"
          href={`https://www.twitter.com/${twitter_handle}`}
          borderColor="transparent"
          size="xs"
          px={1}
        >
          92
        </Button>
        <Button
          data-testid="wallet-button"
          display={{ base: 'flex', lg: 'none' }}
          mt={{ base: '0 !important', lg: '-1.5 !important' }}
          as={Link}
          rounded="full"
          target="_blank"
          _hover={{ bg: 'heds.300', color: 'heds.bg' }}
          href={`https://www.etherscan.com/address/${wallet}`}
          border="solid 1px"
          color="heds.300"
          bg="heds.bg2"
          borderColor="transparent"
          size="xs"
          px={3}
        >
          {wallet?.slice(0, 6)}
        </Button>
        {twitter_handle && (
          <Button
            data-testid="twitter-button"
            display={{ base: 'flex', lg: 'none' }}
            as={Link}
            mb={{ base: '0 !important', lg: '-1 !important' }}
            rounded="full"
            target="_blank"
            _hover={{ bg: 'heds.300', color: 'heds.bg' }}
            border="solid 1px"
            color="heds.300"
            bg="heds.bg2"
            href={`https://www.twitter.com/${twitter_handle}`}
            borderColor="transparent"
            size="xs"
            px={0}
          >
            <i className="fa-brands fa-twitter"></i>
          </Button>
        )}
      </Flex>
    </Stack>
  );
};
