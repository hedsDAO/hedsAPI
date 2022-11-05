import { Stack, Flex } from '@chakra-ui/react';
import { ProfileWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, NameButton, SplitsBalanceAlert } from '@/pages/profile/components';
import { Badges, Collection, Description, DisplayName, ProfilePicture, Samples, Submissions, Tracks, Banner } from '@/common/user';

export const Profile = () => {
  return (
    <ProfileWrapper>
      <Banner />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={[2, 4, 8, 10]} px={[12, 8, 4, 2]} py={2}>
        <Stack direction={'column'}>
          <ProfilePicture />
          <SettingsButton />
          <Badges />
          <Flex pt={4} gap={1} alignItems={'center'}>
            <DisplayName />
            <NameButton />
          </Flex>
          <Description />
          <Flex alignItems={'end'} direction={'row'} gap={2}>
            <TwitterLinkButton />
            <CopyWalletButton />
            <VerifyTwitterButton />
          </Flex>
        </Stack>
        <Stack mt={{ base: '0', md: '40' }} direction={'column'} spacing="10" width={'full'}>
          <SplitsBalanceAlert />
          <Submissions />
          <Tracks />
          <Collection />
          <Samples />
        </Stack>
      </Flex>
    </ProfileWrapper>
  );
};
