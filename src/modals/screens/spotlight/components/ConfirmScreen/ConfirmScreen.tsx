import { Dispatch, store } from '@/store';
import { Avatar, Button, Flex, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SpotlightSteps } from '@/modals/screens/spotlight/models/common';
import * as styles from '@/modals/screens/spotlight/components/ConfirmScreen/styles';
import * as constants from '@/modals/screens/spotlight/models/constants';

/**
 * @function ConfirmScreen
 * @description A component to display the confirm screen for the spotlight modal.
 * @returns {JSX.Element} The `ConfirmScreen` component JSX element.
 */

export const ConfirmScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const userId = useSelector(store.select.authModel.selectUserId);
  const wallet = useSelector(store.select.authModel.selectWallet);
  const spotlightId = useSelector(store.select.spotlightModel.selectSpotlightId);
  const spotlightTrack = useSelector(store.select.spotlightModel.selectSpotlightTrack);
  return (
    <Stack {...styles.$confirmScreenStackStyles}>
      <Flex {...styles.$confirmScreenFlexStyles}>
        <Skeleton {...styles.$confirmScreenSkeletonStyles(hasImageLoaded)}>
          <Avatar {...styles.$confirmScreenAvatarStyles(setHasImageLoaded.on)} src={spotlightTrack?.cover} />
        </Skeleton>
        <Stack {...styles.$confirmScreenArtistStackStyles}>
          <Text {...styles.$confirmScreenTrackNameStyles}>{spotlightTrack?.track_name}</Text>
          <Text {...styles.$confirmScreenTrackArtistsStyles}>
            {spotlightTrack?.public ? spotlightTrack?.artists?.map((artist) => artist?.display_name).join(', ') : 'Anonymous'}
          </Text>
        </Stack>
      </Flex>
      <Flex {...styles.$confirmScreenButtonFlexStyles}>
        <Button
          {...styles.$confirmScreenBackButtonStyles(() => {
            dispatch.spotlightModel.clearSearchState();
            dispatch.spotlightModel.setSpotlightTrack(null);
            dispatch.spotlightModel.setCurrentStep(SpotlightSteps.SEARCH);
          })}
        >
          {constants.BACK_BUTTON_TEXT}
        </Button>
        <Button {...styles.$confirmScreenConfirmButtonStyles(() => dispatch.spotlightModel.updateUserSpotlight([userId, wallet, spotlightId]))}>
          {constants.CONFIRM_BUTTON_TEXT}
        </Button>
      </Flex>
    </Stack>
  );
};
