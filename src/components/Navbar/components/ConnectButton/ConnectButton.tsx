import { Modals } from '@/modals/models/modalModel';
import { Dispatch } from '@/store';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { CONNECT_BUTTON_TEXT } from '@/components/Navbar/models/constants';
import * as styles from '@/components/Navbar/components/ConnectButton/styles';

/**
 * @function ConnectButton
 * @description ConnectButton component renders a button that opens the modal to connect a user account.
 * @returns {JSX.Element} Rendered ConnectButton component.
 */

export const ConnectButton = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Button {...styles.$buttonStyles} onClick={() => dispatch.modalModel.setModal(Modals.CONNECT)}>
      {CONNECT_BUTTON_TEXT}
    </Button>
  );
};
