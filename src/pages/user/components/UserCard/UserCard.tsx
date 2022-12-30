import { Dispatch, store } from '@/store';
import { Avatar, Button, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { Badges, WalletButton, TwitterButton } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { Modals } from '@/modules/modals/store/modalModel';

const UserCard = () => {
  const dispatch = useDispatch<Dispatch>();
  const profilePicture = useSelector(store.select.userModel.selectCurrentUserProfilePicture);
  const displayName = useSelector(store.select.userModel.selectCurrentUserDisplayName);
  const description = useSelector(store.select.userModel.selectCurrentUserDescription);
  const isOwnPage = useSelector(store.select.userModel.selectIsOwnPage);
  return (
    <Fragment>
      <VStack minW={{ base: 'full', lg: '64' }} maxW={{ base: 'full', lg: '64' }}>
        {isOwnPage ? (
          <Avatar shadow={'md'} size="2xl" src={profilePicture}>
            <Button
              shadow="sm"
              size="sm"
              ml="24"
              mt="20"
              mr={0}
              position={'absolute'}
              rounded="full"
              border="2px"
              borderColor="gray.300"
              _hover={{ bg: 'gray.200', color: 'gray.700' }}
              bg="gray.100"
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
        ) : (
          <Avatar shadow={'md'} size="2xl" src={profilePicture} />
        )}
        <Flex gap={1} pt={3} alignItems={'center'} direction={'column'}>
          <Heading textAlign={'center'} fontWeight={'semibold'} fontSize="2xl">
            {displayName}
          </Heading>
          <Text textAlign={'center'} height="fit-content" maxW="48" fontWeight={'light'} fontSize="sm" overflowWrap={'normal'}>
            {description}
          </Text>
          <Divider my={{ base: 4, lg: 3 }} />
          <Badges />
          <Divider my={{ base: 4, lg: 3 }} />
        </Flex>
        <Flex gap={2} alignItems={'center'} justifyContent="center" direction={'column'}>
          <WalletButton />
          <TwitterButton />
        </Flex>
      </VStack>
    </Fragment>
  );
};
export default UserCard;
