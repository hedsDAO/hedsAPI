import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Button, Flex, Link, Stack, Text } from '@chakra-ui/react';

export const WalletAndVP = () => {
  const wallet = useSelector(store.select.userModel.selectWallet);
  return (
    <Flex
      direction={{ base: 'row-reverse', lg: 'row' }}
      mt={{ base: '-190px', lg: 1 }}
      pr={{ base: 4, lg: 0 }}
      gap={{ base: 1.5, lg: 2 }}
      alignItems={{ base: 'center', lg: 'center' }}
    >
      <Stack direction={{ base: 'row-reverse', lg: 'column' }} alignItems={{ base: 'center', lg: 'end' }} gap={1.5}>
        <Text className="gradient-text" fontFamily={'poppins'} fontWeight="bold" fontSize={{ base: '2xl', lg: '4xl' }}>
          92
        </Text>
        <Button
          display={{ base: 'none', lg: 'flex' }}
          mt={{ base: '-4 !important', lg: '-2 !important' }}
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
      </Stack>
      <Text mt={{ base: '-1.5 !important', lg: '-3 !important' }} fontSize={{ base: 'xs', lg: 'md' }} opacity={'30%'} color="white" className="fas fa-info-circle" as={'i'}></Text>
    </Flex>
  );
};
