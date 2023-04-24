import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import * as styles from '@pages/user/components/Details/styles';

/**
 * @function Details
 * @description Renders a users' personal details, including wallet, VP, and artist information.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Details = () => {
  const display_name = useSelector(store.select.userModel.selectDisplayName);
  const description = useSelector(store.select.userModel.selectDescription);
  const twitter_handle = useSelector(store.select.userModel.selectTwitterHandle);
  const wallet = useSelector(store.select.userModel.selectWallet);

  return (
    <Stack {...styles.$detailsStackStyles}>
      <Flex {...styles.$displayNameFlexStyles}>
        <Text {...styles.$displayNameTextStyles}>{display_name}</Text>
        {twitter_handle && (
          <Button {...styles.$twitterButtonStyles(twitter_handle)}>
            <i className={styles.$twitterIcon}></i>
          </Button>
        )}
      </Flex>
      <Flex {...styles.$descriptionFlexStyles}>
        <Text {...styles.$descriptionTextStyles}>{description}</Text>
      </Flex>
      <Flex {...styles.$walletAndTwitterButtonsFlexStyles}>
        {twitter_handle && <Button {...styles.$twitterButtonStyles(twitter_handle)}>92</Button>}
        <Button {...styles.$walletButtonStyles(wallet)}>{wallet?.slice(0, 6)}</Button>
        {twitter_handle && (
          <Button {...styles.$twitterButtonStyles(twitter_handle)}>
            <i className={styles.$twitterIcon}></i>
          </Button>
        )}
      </Flex>
    </Stack>
  );
};
