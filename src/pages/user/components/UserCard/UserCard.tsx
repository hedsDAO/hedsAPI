import { RootState, store } from '@/store';
import { formatWallet } from '@/utils';
import { Avatar, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const UserCard = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const profilePicture = useSelector(store.select.userModel.selectCurrentUserProfilePicture);
  const displayName = useSelector(store.select.userModel.selectCurrentUserDisplayName);
  const wallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const twitterHandle = useSelector(store.select.userModel.selectCurrentUserTwitterHandle);
  const description = useSelector(store.select.userModel.selectCurrentUserDescription);
  return (
    <Fragment>
      <VStack minW={'64'} maxW="64">
        <Avatar shadow={'md'} border={'2px'} size="2xl" src={profilePicture} />
        <Flex gap={1} pt={3} alignItems={'center'} direction={'column'}>
          <Heading textAlign={'center'} fontWeight={'semibold'} fontSize="2xl">
            {displayName}
          </Heading>
          <Text textAlign={'center'} height="fit-content" maxW="48" fontWeight={'light'} fontSize="sm" overflowWrap={'normal'}>
            {description}
          </Text>
        </Flex>
        <Flex pt={3} gap={1} alignItems={'center'} direction="column">
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
