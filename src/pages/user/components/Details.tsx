import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Box, Button, Flex, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { IconBrandTwitter } from '@tabler/icons';

export const Details = () => {
  const display_name = useSelector(store.select.userModel.selectDisplayName);
  const description = useSelector(store.select.userModel.selectDescription);
  const twitter_handle = useSelector(store.select.userModel.selectTwitterHandle);
  const wallet = useSelector(store.select.userModel.selectWallet);

  return (
    <Stack alignItems={{ base: 'center', lg: 'start' }}>
      <Flex mt={{ base: '-2 !important', lg: 0 }} gap={2} alignItems="center">
        <Text fontFamily={'poppins'} fontWeight="bold" color="white" fontSize="4xl">
          {display_name}
        </Text>
        {twitter_handle && (
          <Button
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
      <Flex mt="-2 !important" gap={0.5} alignItems={'end'}>
        <Text mt="0 !important" fontFamily={'inter'} color="white" opacity={'60%'}>
          {description}
        </Text>
      </Flex>
      <Flex gap={1} alignItems={'baseline'}>
        <Button
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
