import { Dispatch, store } from '@/store';
import { Flex, Input, Button, Text, Stack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const DisplayNameForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const displayNameInput = useSelector(store.select.connectModel.selectDisplayName);
  const userWallet = useSelector(store.select.authModel.selectWallet);
  const error = useSelector(store.select.connectModel.selectError);
  const userId = useSelector(store.select.authModel.selectUserId);
  const isValid = useSelector(store.select.connectModel.selectIsDisplayNameValid);
  const isLoading = useSelector(store.select.connectModel.selectIsLoading);
  return (
    <Stack pb={2}>
      <Stack mb={4}>
        <Text color="white" fontSize={'2xs'} fontFamily={'inter'} letterSpacing="widest">
          - must be between 3 - 15 characters.
        </Text>
        <Text color="white" fontSize={'2xs'} fontFamily={'inter'} letterSpacing="widest">
          - must not contain numbers or spaces.
        </Text>
        <Text color="white" fontSize={'2xs'} fontFamily={'inter'} letterSpacing="widest">
          - choose wisely, you won't be able to change it.
        </Text>
      </Stack>
      <Flex my={2} gap={2}>
        <Input
          type="text"
          value={displayNameInput}
          borderColor="heds.bg5"
          color="gray.200"
          bg="heds.bg2"
          rounded="md"
          size="sm"
          onChange={(e) => {
            dispatch.connectModel.setDisplayName(e.target.value.replace(/\s/g, '').replace(/[0-9]/g, ''));
          }}
        />
        <Button
          isLoading={isLoading}
          bg="heds.100"
          onClick={() => dispatch.connectModel.validateDisplayName([displayNameInput, userId, userWallet])}
          isDisabled={!isValid}
          size="sm"
        >
          GO
        </Button>
      </Flex>
      <Flex mt={2}>
        {error?.length ? (
          <Text color={'red.500'} opacity={'70%'} fontSize={'2xs'}>
            {error}
          </Text>
        ) : (
          <>
            {displayNameInput?.length ? (
              <Text color={displayNameInput?.length > 15 ? 'red.500' : 'white'} opacity={'70%'} fontSize={'2xs'}>
                {15 - displayNameInput?.length >= 0 ? `${displayNameInput?.length} characters remaining` : `must be between 3 - 15 characters`}
              </Text>
            ) : (
              <></>
            )}
          </>
        )}
      </Flex>
    </Stack>
  );
};
