import { Fragment, useEffect, useState } from 'react';
import { Box, Button, Container, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { getSplitsBalance } from '@/utils/graphql/getSplitsBalance';
import { ethers } from 'ethers';
import { selectUserWallet } from '@/pages/user/store/selectors';

const SplitsBalanceAlert = () => {
  const [balance, setBalance] = useState<string>('');
  const wallet = useSelector(selectUserWallet);
  useEffect(() => {
    if (wallet) getUserBalance(wallet);
  }, [wallet]);

  const getUserBalance = async (wallet: string) => {
    const balance = await getSplitsBalance(wallet);
    const tokenId = balance.user.internalBalances[0].token.id;
    const amount = balance.user.internalBalances[0].amount;
    if (tokenId === '0x0000000000000000000000000000000000000000' && amount > 0) {
      return setBalance(ethers.utils.formatEther(amount));
    }
  };
  return (
    <Fragment>
      {balance && +balance > 0 && (
        <Container
          mt={{ base: 4, sm: 0 }}
          maxW="full"
          px={2}
          rounded="md"
          borderColor={'green.300'}
          className="border animate__animated animate__fadeInDown"
          bg={'green.100'}
        >
          <Flex gap={2} my={2} direction={{ base: 'column', lg: 'row' }} justifyContent="space-between" alignItems={'center'}>
            <Flex gap={2} alignItems={'center'}>
              <Box as={Flex} alignItems="center" borderColor={'green.300'} className="border" p={1} bg={'green.50'} rounded="lg">
                <Icon className="animate-pulse" w={5} h={5} as={BellIcon} />
              </Box>
              <Text fontSize={'xs'}>
                <span className="font-bold">You have a pending balance of {balance.slice(0, 5)} ETH.</span> Withdraw your earnings from 0xSplits.
              </Text>
            </Flex>
            <Box>
              <Button
                target="_blank"
                href={`https://app.0xsplits.xyz/accounts/${wallet}`}
                as={Link}
                bg="white"
                border={'1px'}
                borderColor={'gray.300'}
                fontSize="xs"
                size={'sm'}
              >
                <i className="fak fa-splits mr-1"></i> Withdraw
              </Button>
            </Box>
          </Flex>
        </Container>
      )}
    </Fragment>
  );
};

export default SplitsBalanceAlert;
