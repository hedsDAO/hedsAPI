import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Flex, Stack, Text, Button } from '@chakra-ui/react';
import * as styles from '@/modals/screens/twitter/components/Confirm/styles';
import * as constants from '@/modals/screens/twitter/models/constants';

export const Confirm = () => {
  const dispatch = useDispatch<Dispatch>();
  const user = useSelector(store.select.authModel.selectUser);
  const twitterHandle = useSelector(store.select.twitterModel.selectTwitterHandle);
  return (
    <Stack {...styles.$confirmStackStyles}>
      <Flex {...styles.$flexStyles}>
        <Text {...styles.$displayNameStyles}>{user?.display_name}</Text>
        <Text {...styles.$linkIconStyles} />
        <Text {...styles.$twitterHandleStyles}>@{twitterHandle}</Text>
      </Flex>
      <Stack>
        <Text {...styles.$headingTextStyles}>{constants.CONFIRM_HEADING}</Text>
        <Text {...styles.$descriptionTextStyles}>{constants.CONFIRM_DESCRIPTION}</Text>
      </Stack>
      <Button onClick={() => dispatch.twitterModel.linkTwitterHandle([twitterHandle, user?.id])} {...styles.$confirmButtonStyles}>
        {constants.CONFIRM_BUTTON_TEXT}
      </Button>
    </Stack>
  );
};
