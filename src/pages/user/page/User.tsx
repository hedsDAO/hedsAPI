import { Flex, Stack } from '@chakra-ui/react';
import { UserWrapper, PrivateUserWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { Tracks, Submissions, ProfilePicture, DisplayName, Description, Collection, Badges, Samples, Banner } from '@/common/user';

export const User = () => {
  return (
    <div className="">
      <Banner />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={[2, 4, 8, 12]} px={[12, 8, 4, 2]} py={2}>
        <UserWrapper>
          <Stack direction={'column'}>
            <ProfilePicture />
            <Flex flexDirection={'column'} gap={6} pt={2} alignItems={'start'}>
              <Badges />
              <DisplayName />
            </Flex>
            <Description />
            <Flex alignItems={'end'} direction={'row'} gap={2}>
              <TwitterLinkButton />
              <CopyWalletButton />
            </Flex>
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
