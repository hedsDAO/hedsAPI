import { ConnectButton } from '@/common/buttons';
import { Divider, Text } from '@chakra-ui/react';
import { Fragment } from 'react';

const ConnectWallet = () => {
  return (
    <Fragment>
      <Text mb={4} fontSize="lg" fontWeight={'semibold'} textColor={'blackAlpha.800'}>
        Connect your wallet
      </Text>
      <ConnectButton />
      <Divider my={5} />
    </Fragment>
  );
};

export default ConnectWallet;
