import { Dispatch, store } from '@/store';
import { Button, Center, Flex, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from '@/modals/screens/submit/components/SuccessScreen/styles';
import * as constants from '@/modals/screens/submit/models/constants';

export const SuccessScreen = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const dispatch = useDispatch<Dispatch>();
  const displayName = useSelector(store.select.authModel.selectUserDisplayName);
  const newSubmission = useSelector(store.select.submitModel.selectNewSubmission);

  return (
    <Stack {...styles.$stackStyles}>
      <Text {...styles.$warningTextStyles}>{constants.SUCCESS_WARNING_TEXT}</Text>
      <Flex {...styles.$flexStyles}>
        <Skeleton {...styles.$skeletonStyles(hasImageLoaded)}>
          <Center {...styles.$centerStyles}>
            <Image onLoad={setHasImageLoaded.on} src={newSubmission?.submission_data?.sub_image} {...styles.$imageStyles} />
          </Center>
        </Skeleton>
        <Stack {...styles.$stackJustifyCenter}>
          <Text {...styles.$displayNameTextStyles}>{displayName}</Text>
          <Text {...styles.$displayNameSecondaryTextStyles}>{displayName}</Text>
        </Stack>
      </Flex>
      <Button onClick={() => dispatch.submitModel.clearState()} {...styles.$exitButtonStyles}>
        {constants.EXIT_BUTTON_TEXT}
      </Button>
    </Stack>
  );
};
