import { Dispatch, store } from '@/store';
import { Avatar, Badge, Button, Divider, Flex, Heading, Text, VStack, Link, Box, Tooltip, Tag, TagLabel } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
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
  const currentUserVp = useSelector(store.select.userModel.selectCurrentUserVotingPower);

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
            <Box my={3}>
              <Button
                borderColor={'gray.400'}
                variant={'outline'}
                size="xs"
                target="_blank"
                as={Link}
                href={`https://app.0xsplits.xyz/accounts/${currentWallet.toLowerCase()}`}
              >
                <SplitsIcon color="#121212" />
                <span className="ml-1 text-xs font-semibold">{splitsBalance.slice(0, 5)}</span>
                <span className="font-regular text-xs px-1">ETH</span>
              </Button>
            </Box>
          )}
          <Tag mb='3' size='lg' borderRadius='full'>
            <Text mr="1" color="green"> {currentUserVp} </Text>
            <TagLabel>HED</TagLabel>
            <Tooltip  label={"hedsPOWER is determined from hedsTAPE(s) ownership. hedsTAPE(s) with a higher ratio of owners to tapes in that collection will have higher hedsPOWER."}>
              <InfoOutlineIcon h={'3'} w={'3'} ml="1" color="gray.500" />
            </Tooltip>
          </Tag>
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
