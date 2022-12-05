import { Dispatch, store } from '@/store';
import { Avatar, Box, Button, Divider, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { Badges, WalletButton, TwitterButton } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { Modals } from '@/modules/modals/store/modalModel';
import { DateTime } from 'luxon';

const UserCard = () => {
  const dispatch = useDispatch<Dispatch>();
  const profilePicture = useSelector(store.select.userModel.selectCurrentUserProfilePicture);
  const displayName = useSelector(store.select.userModel.selectCurrentUserDisplayName);
  const description = useSelector(store.select.userModel.selectCurrentUserDescription);
  const joined = useSelector(store.select.userModel.selectCurrentUserJoined);
  const isOwnPage = useSelector(store.select.userModel.selectIsOwnPage);
  return (
    <Fragment>
      <VStack minW={'64'} maxW="64">
        {isOwnPage ? (
          <>
          <Avatar variant={'user'} shadow={'md'} border={'2px'} size="2xl" src={profilePicture}>
            <Button
              shadow="md"
              size="sm"
              ml="24"
              mt="20"
              mr={0}
              position={'absolute'}
              rounded="full"
              border="2px"
              borderColor="white"
              _hover={{ bg: 'gray.50', color: 'gray.500' }}
              bg="white"
              textColor={'gray.600'}
              justifyContent={'center'}
              p={1}
              onClick={() => {
                dispatch.modalModel.setModal(Modals.SETTINGS_MODAL);
                dispatch.modalModel.setModalOpen(true);
              }}
              aria-label="settings"
            >
              <i className="fa-sharp fa-solid fa-gear"></i>
            </Button>
          </Avatar>
          </>
        ) : (
          <Avatar shadow={'md'} border={'2px'} size="2xl" src={profilePicture} />
        )}

        <Flex gap={1} pt={3} alignItems={'center'} direction={'column'}>
          <Heading textAlign={'center'} fontWeight={'semibold'} fontSize="2xl">
            {displayName}
          </Heading>

          <Text textAlign={'center'} height="fit-content" maxW="48" fontWeight={'light'} fontSize="sm" overflowWrap={'normal'}>
            {description}
          </Text>
          <Divider my={3} />
          <Badges />
          <Divider my={3} />
          <HStack>
            <Text textAlign={'center'} height="fit-content" maxW="48" fontWeight={'medium'} fontSize="xs" overflowWrap={'normal'}>
              joined
            </Text>
            <Text textAlign={'center'} height="fit-content" maxW="48" fontWeight={'thin'} fontSize="xs" overflowWrap={'normal'}>
              {DateTime.fromMillis(joined).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
            </Text>
          </HStack>
        </Flex>
        <Flex pt={6} gap={1} alignItems={'center'} justifyContent="center" direction="column">
          <WalletButton />
          <TwitterButton />
        </Flex>
      </VStack>
    </Fragment>
  );
};
export default UserCard;
