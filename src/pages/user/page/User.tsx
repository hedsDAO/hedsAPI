import { Flex, Stack } from '@chakra-ui/react';
import { UserWrapper, PrivateUserWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { Tracks, Submissions, ProfilePicture, DisplayName, Description, Collection, Badges, Samples, Banner } from '@/common/user';

export const User = () => {
  return (
    <div className="">
      <Banner />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={10} px={[10, 4, 2, 0]} py={4}>
        <UserWrapper>
          <Stack direction={'column'}>
            <ProfilePicture />
            <Badges />
            <DisplayName />
            <Description />
            <CopyWalletButton />
            <TwitterLinkButton />
          </Stack>
          <Stack mt={{ base: '0', md: '36' }} direction={'column'} spacing="10" width={'full'}>
            <PrivateUserWrapper>
              <Samples />
              <Tracks />
              <Submissions />
              <Collection />
            </PrivateUserWrapper>
          </Stack>
        </UserWrapper>
      </Flex>
    </div>
  );
};
