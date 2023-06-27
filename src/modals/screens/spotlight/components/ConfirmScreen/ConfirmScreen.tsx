import { Dispatch, store } from '@/store';
import { Avatar, Button, Flex, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SpotlightSteps } from '../../models/common';

export const ConfirmScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const userId = useSelector(store.select.authModel.selectUserId);
  const wallet = useSelector(store.select.authModel.selectWallet);
  const spotlightId = useSelector(store.select.spotlightModel.selectSpotlightId);
  const spotlightTrack = useSelector(store.select.spotlightModel.selectSpotlightTrack);
  return (
    <Stack gap={2} pb={3}>
      <Flex gap={4}>
        <Skeleton startColor="heds.bg2" endColor="heds.400" fitContent isLoaded={hasImageLoaded}>
          <Avatar borderRadius={0} size="lg" onLoad={setHasImageLoaded.on} objectFit={'contain'} src={spotlightTrack?.cover} />
        </Skeleton>
        <Stack gap={0.5} justifyContent="center">
          <Text color="white" opacity={'80%'} mt={'0 !important'} fontSize="sm">
            {spotlightTrack?.track_name}
          </Text>
          <Text color="white" opacity={'50%'} mt={'0 !important'} fontSize="xs">
            {spotlightTrack?.public ? spotlightTrack?.artists?.map((artist) => artist?.display_name).join(', ') : 'Anonymous'}
          </Text>
        </Stack>
      </Flex>
      <Flex gap={2}>
        <Button
          onClick={() => {
            dispatch.spotlightModel.clearSearchState();
            dispatch.spotlightModel.setSpotlightTrack(null);
            dispatch.spotlightModel.setCurrentStep(SpotlightSteps.SEARCH);
          }}
          color="white"
          width="50%"
          rounded="sm"
          size="xs"
          bg="heds.bg2"
        >
          Back
        </Button>
        <Button
          onClick={() => dispatch.spotlightModel.updateUserSpotlight([userId, wallet, spotlightId])}
          color="white"
          width="50%"
          rounded="sm"
          size="xs"
          bg="heds.100"
        >
          Confirm
        </Button>
      </Flex>
    </Stack>
  );
};
