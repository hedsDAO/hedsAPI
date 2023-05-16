import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import * as styles from '@pages/user/components/Details/styles';
import { Modals } from '@/modals/models/modalModel';

/**
 * @function Details
 * @description Renders a users' personal details, including wallet, VP, and artist information.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Details = () => {
  const dispatch = useDispatch<Dispatch>();
  const display_name = useSelector(store.select.userModel.selectDisplayName);
  const description = useSelector(store.select.userModel.selectDescription);
  const twitter_handle = useSelector(store.select.userModel.selectTwitterHandle);
  const wallet = useSelector(store.select.userModel.selectWallet);
  const connectedWallet = useSelector(store.select.authModel.selectUser)?.wallet as string;
  const isLoading = useSelector((state: RootState) => state.loading.effects.userModel.getUser);

  return (
    <Stack {...styles.$detailsStackStyles}>
      {!isLoading && (
        <Flex {...styles.$displayNameFlexStyles}>
          <Text {...styles.$displayNameTextStyles}>{display_name}</Text>
          {twitter_handle ? (
            <Button {...styles.$twitterButtonStyles(twitter_handle)}>
              <i className={styles.$twitterIcon}></i>
            </Button>
          ) : wallet === connectedWallet ? (
            <Button onClick={() => dispatch.modalModel.setModal(Modals.TWITTER)} {...styles.$verifyTwitterButtonStyles}>
              <i className={styles.$twitterIcon}></i> verify
            </Button>
          ) : (
            <></>
          )}
        </Flex>
      )}
      <Flex {...styles.$descriptionFlexStyles}>
        <Text {...styles.$descriptionTextStyles}>{description}</Text>
      </Flex>
      {!isLoading && (
        <Flex {...styles.$walletAndTwitterButtonsFlexStyles}>
          <Text {...styles.$votingPowerStyles}>92</Text>
          <Button {...styles.$walletButtonStyles(wallet)}>{wallet?.slice(0, 6)}</Button>
          {twitter_handle ? (
            <Button {...styles.$twitterButtonMobileStyles(twitter_handle)}>
              <i className={styles.$twitterIcon}></i>
            </Button>
          ) : wallet === connectedWallet ? (
            <Button onClick={() => dispatch.modalModel.setModal(Modals.TWITTER)} {...styles.$verifyTwitterButtonMobileStyles}>
              <i className={styles.$twitterIcon}></i> verify
            </Button>
          ) : (
            <></>
          )}
        </Flex>
      )}
    </Stack>
  );
};
