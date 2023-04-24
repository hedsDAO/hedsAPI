import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import * as styles from '@pages/user/components/WalletAndVP/styles';

/**
 * @function WalletAndVP
 * @description Renders a user's wallet address and VP (voting power) with a button to open the wallet on Etherscan.
 * @returns {JSX.Element} - Rendered component.
 **/

export const WalletAndVP = () => {
  const wallet = useSelector(store.select.userModel.selectWallet);
  // TODO: replace with actual vp
  return (
    <Flex {...styles.$flexContainerStyles}>
      <Stack {...styles.$flexInnerStackStyles}>
        <Text {...styles.$gradientTextStyles}>92</Text>
        {wallet?.length && <Button {...styles.$buttonStyles(wallet)}>{wallet?.slice(0, 6)}</Button>}
      </Stack>
      <Text {...styles.$infoIconStyles} />
    </Flex>
  );
};
