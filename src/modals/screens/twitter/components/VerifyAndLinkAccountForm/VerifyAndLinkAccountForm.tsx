import { RootState } from '@/store';
import { formatWallet } from '@/utils';
import { Avatar, Flex, FormControl, FormLabel, Tag, TagLabel, Text } from '@chakra-ui/react';
import { IconAlertCircle, IconLink } from '@tabler/icons';
import { useSelector } from 'react-redux';

const VerifyAndLinkAccountForm = () => {
  const userData = useSelector((state: RootState) => state.userModel);
  const { twitterHandle } = useSelector((state: RootState) => state.twitterModel);

  return (
    <FormControl id="verify-confirm">
      <Flex gap={3} flexDirection={'column'}>
        <FormLabel variant="inline">5. Verify and link accounts</FormLabel>
        <Flex gap={2} alignItems={'center'}>
          <IconAlertCircle height={18} width={18} />
          <Text>Artist Disclaimer</Text>
        </Flex>
        <Text fontSize="sm">
          To maintain artist identity, if you are featured on a heds compliation, your twitter handle will be linked to your account indefinitely.
        </Text>
      </Flex>
      <Flex alignItems={'center'} my={5} gap={4} direction={'row'}>
        <Tag size="lg" colorScheme="blue" borderRadius="full">
          <Avatar
            src={userData?.profilePicture}
            size="2xs"
            name={userData?.displayName ? userData?.displayName : userData?.wallet ? formatWallet(userData?.wallet) : ''}
            ml={-1}
            mr={2}
          />
          <TagLabel> {userData?.displayName ? userData?.displayName : userData?.wallet ? formatWallet(userData?.wallet) : ''}</TagLabel>
        </Tag>
        <IconLink height={20} width={20} />
        <Tag py={1} size="lg" colorScheme="blue" borderRadius="full">
          <TagLabel>{twitterHandle}</TagLabel>
        </Tag>
      </Flex>
    </FormControl>
  );
};

export default VerifyAndLinkAccountForm;
