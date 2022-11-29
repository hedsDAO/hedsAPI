import { Dispatch, RootState, store } from '@/store';
import { formatWallet } from '@/utils';
import { Avatar, AvatarBadge, Button, Flex, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badges } from '@/common/user';
import { IconSettings } from '@tabler/icons';
import { Modals } from '@/modules/modals/store/modalModel';

const UserCard = () => {
  const dispatch = useDispatch<Dispatch>();
  const profilePicture = useSelector(store.select.userModel.selectCurrentUserProfilePicture);
  const displayName = useSelector(store.select.userModel.selectCurrentUserDisplayName);
  const wallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const twitterHandle = useSelector(store.select.userModel.selectCurrentUserTwitterHandle);
  const description = useSelector(store.select.userModel.selectCurrentUserDescription);
  const connectedWallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  return (
    <Fragment>
      <VStack minW={'64'} maxW="64">
        {connectedWallet === wallet ? (
          <Avatar shadow={'md'} border={'2px'} size="2xl" src={profilePicture}>
            <IconButton
              size="sm"
              ml="24"
              mt="20"
              position={'absolute'}
              rounded="full"
              border="2px"
              borderColor="white"
              _hover={{ bg: 'gray.50', color: 'gray.500' }}
              bg="gray.100"
              textColor={'gray.400'}
              as={IconSettings}
              p={1}
              onClick={() => {
                dispatch.modalModel.setModal(Modals.SETTINGS_MODAL);
                dispatch.modalModel.setModalOpen(true);
              }}
              aria-label="settings"
            ></IconButton>
          </Avatar>
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
          <Badges />
        </Flex>
        <Flex pt={6} gap={1} alignItems={'center'} direction="column">
          <Button leftIcon={<i className="fa-solid fa-copy text-xs"></i>} variant="outline" fontWeight={'light'} size="xs">
            {formatWallet(wallet)}
          </Button>
          <Button leftIcon={<i className="fa-brands fa-twitter text-xs"></i>} variant="outline" fontWeight={'light'} size="xs">
            @{twitterHandle}
          </Button>
        </Flex>
      </VStack>
    </Fragment>
  );
};
export default UserCard;
