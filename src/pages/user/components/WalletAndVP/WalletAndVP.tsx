import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Button, Flex, Stack, Text, Tooltip } from '@chakra-ui/react';
import * as styles from '@pages/user/components/WalletAndVP/styles';
import * as constants from '@pages/user/models/constants';

/**
 * @function WalletAndVP
 * @description Renders a user's wallet address and VP (voting power) with a button to open the wallet on Etherscan.
 * @returns {JSX.Element} - Rendered component.
 **/

export const WalletAndVP = () => {
  const wallet = useSelector(store.select.userModel.selectWallet);
  const userVp = useSelector(store.select.userModel.selectUserVp);
  return (
    <Flex {...styles.$flexContainerStyles}>
      <Stack {...styles.$flexInnerStackStyles}>
        <Text {...styles.$gradientTextStyles}>{userVp || 0}</Text>
        {wallet?.length && <Button {...styles.$buttonStyles(wallet)}>{wallet?.slice(0, 6)}</Button>}
      </Stack>
      <Tooltip label={constants.VP_TOOLTIP_TEXT}>
        <Text {...styles.$infoIconStyles} />
      </Tooltip>
    </Flex>
  );
};
