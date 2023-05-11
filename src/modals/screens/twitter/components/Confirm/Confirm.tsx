import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import * as constants from '@/modals/screens/twitter/models/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

export const Confirm = () => {
  const dispatch = useDispatch<Dispatch>();
  const user = useSelector(store.select.authModel.selectUser);
  const twitterHandle = useSelector(store.select.twitterModel.selectTwitterHandle);
  return (
    <Stack mb={5} gap={3}>
      <Flex gap={2} alignItems={'center'}>
        <Text color="white" opacity="70%" fontSize="sm">
          {user?.display_name}
        </Text>
        <Text as={'i'} className="fas fa-link" ml={1} color="heds.700" />
        <Text color="white" opacity="70%" fontSize="sm">
          @{twitterHandle}
        </Text>
      </Flex>
      <Stack>
        <Text ml={0.5} color="red.500" fontFamily={'inter'} fontSize="xs" fontWeight={'bold'} mt={'0 !important'} letterSpacing={'wide'}>
          {constants.CONFIRM_HEADING}
        </Text>
        <Text ml={0.5} fontFamily={'inter'} color="white" fontSize="2xs" opacity="60%" mt={'0 !important'}>
          {constants.CONFIRM_DESCRIPTION}
        </Text>
      </Stack>
      <Button
        onClick={() => dispatch.twitterModel.linkTwitterHandle([twitterHandle, user?.id])}
        pointerEvents={'auto'}
        bg={'heds.700'}
        color="white"
        letterSpacing={'widest'}
        fontFamily={'inter'}
        fontSize="2xs"
        px={5}
        size="sm"
      >
        {constants.CONFIRM_BUTTON_TEXT}
      </Button>
    </Stack>
  );
};
