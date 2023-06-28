import { Dispatch, store } from '@/store';
import { Avatar, Button, Flex, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from '@/modals/screens/spotlight/components/ReplaceScreen/styles';
import * as constants from '@/modals/screens/spotlight/models/constants';

/**
 * @function ReplaceScreen
 * @description A component to display the replace screen for the spotlight modal.
 * @returns {JSX.Element} The `ReplaceScreen` component JSX element.
 */

export const ReplaceScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const userId = useSelector(store.select.authModel.selectUserId);
  const wallet = useSelector(store.select.authModel.selectWallet);
  const spotlightTrack = useSelector(store.select.spotlightModel.selectSpotlightTrack);
  return (
    <Stack {...styles.$replaceScreenStackStyles}>
      <Flex {...styles.$replaceScreenFlexStyles}>
        <Skeleton {...styles.$replaceScreenSkeletonStyles(hasImageLoaded)}>
          <Avatar {...styles.$replaceScreenAvatarStyles(setHasImageLoaded.on)} src={spotlightTrack?.cover} />
        </Skeleton>
        <Stack {...styles.$replaceScreenArtistStackStyles}>
          <Text {...styles.$replaceScreenTrackNameStyles}>{spotlightTrack?.track_name}</Text>
          <Text {...styles.$replaceScreenTrackArtistsStyles}>
            {spotlightTrack?.public ? spotlightTrack?.artists?.map((artist) => artist?.display_name).join(', ') : 'anonymous'}
          </Text>
        </Stack>
      </Flex>
      <Flex {...styles.$replaceScreenButtonFlexStyles}>
        <Button {...styles.$replaceScreenBackButtonStyles(() => dispatch.spotlightModel.clearState())}>{constants.BACK_BUTTON_TEXT}</Button>
        <Button {...styles.$replaceScreenReplaceButtonStyles(() => dispatch.spotlightModel.updateUserSpotlight([userId, wallet, null]))}>
          {constants.REPLACE_BUTTON_TEXT}
        </Button>
      </Flex>
    </Stack>
  );
};
