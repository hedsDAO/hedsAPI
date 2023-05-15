import { Button } from '@chakra-ui/react';
import { useDisconnect } from 'wagmi';
import { DISCONNECT_BUTTON_ICON } from '@/components/Navbar/models/constants';
import * as styles from '@/components/Navbar/components/DisconnectButton/styles';

/**
 * @function DisconnectButton
 * @description DisconnectButton component renders a button that disconnects the current user account.
 * @returns {JSX.Element} Rendered DisconnectButton component.
 */

export const DisconnectButton = () => {
  const { disconnect } = useDisconnect();
  return (
    <Button {...styles.$buttonStyles} onClick={() => disconnect()}>
      <i className={DISCONNECT_BUTTON_ICON} />
    </Button>
  );
};
