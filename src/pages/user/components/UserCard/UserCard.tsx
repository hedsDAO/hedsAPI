import { Dispatch, store } from '@/store';
import { Avatar, Button, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { Badges, WalletButton, TwitterButton } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { Modals } from '@/modules/modals/store/modalModel';
import { SplitsIcon } from '@/common/icons';
import * as gaEvents from '@/events';

const UserCard = () => {
  const dispatch = useDispatch<Dispatch>();
  const profilePicture = useSelector(store.select.userModel.selectCurrentUserProfilePicture);
  const displayName = useSelector(store.select.userModel.selectCurrentUserDisplayName);
  const description = useSelector(store.select.userModel.selectCurrentUserDescription);
  const connectedUser = useSelector(store.select.userModel.selectConnectedUser);
  const isOwnPage = useSelector(store.select.userModel.selectIsOwnPage);
  const currentWallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const splitsBalance = useSelector(store.select.userModel.selectUserSplitsBalance);

  useEffect(() => {
    if (!isOwnPage) return;
    dispatch.userModel.getSplitsBalance(currentWallet);
  }, [isOwnPage]);

  return (
    <Fragment>
      <VStack minW={{ base: 'full', lg: '64' }} maxW={{ base: 'full', lg: '64' }}>
        {!!connectedUser && currentWallet === connectedUser?.wallet ? (
          <Avatar shadow={'md'} size="2xl" src={profilePicture}>
            <Button
              shadow="sm"
              size="sm"
              ml="24"
              mt="20"
              mr={0}
              position={'absolute'}
              rounded="full"
              border="1px"
              borderColor="black"
              _hover={{ bg: 'gray.200', color: 'gray.700' }}
              bg="gray.100"
              textColor={'blackAlpha.800'}
              justifyContent={'center'}
              p={1}
              onClick={() => {
                dispatch.modalModel.setModal(Modals.SETTINGS_MODAL);
                dispatch.modalModel.setModalOpen(true);
                gaEvents.clickSettingsButton();
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
          {splitsBalance && (
            <button className="mx-1 px-2 py-2 mb-1 rounded-sm border border-gray-400 bg-gray-100 inline-flex items-center">
              <a target="_blank" className="flex justify-start items-center gap-x-1" href={`https://app.0xsplits.xyz/accounts/${currentWallet.toLowerCase()}`}>
                <div className="inline dark:hidden">
                  <SplitsIcon color="#121212" />
                </div>
                <span className="ml-1 text-xs font-semibold">{splitsBalance.slice(0, 5)}</span>
                <span className="font-regular text-xs px-1">ETH</span>
              </a>
            </button>
          )}
          <Divider borderColor="gray.400" mb={{ base: 4, lg: 3 }} />
          <Badges />
          <Divider borderColor="gray.400" my={{ base: 5, lg: 4 }} />
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
