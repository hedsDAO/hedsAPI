import { Stack, Flex } from '@chakra-ui/react';
import { ProfileWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, NameButton } from '@/pages/profile/components';
import { Badges, Collection, Description, DisplayName, ProfilePicture, Samples, Submissions, Tracks, Banner } from '@/common/user';

export const Profile = () => {
  return (
    <ProfileWrapper>
      <Banner />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={[2, 4, 8, 12]} px={[12, 8, 4, 2]} py={2}>
        <Stack direction={'column'}>
          <ProfilePicture />
          <SettingsButton />
          <Badges />
          <Flex pt={3} gap={1} alignItems={'center'}>
            <DisplayName />
            <NameButton />
          </Flex>
          <Description />
          <Flex pt={2} alignItems={'start'} direction={'column'} gap={1}>
            <CopyWalletButton />
            <TwitterLinkButton />
            <VerifyTwitterButton />
          </Flex>
        </Stack>
        <Stack mt={{ base: '0', md: '40' }} direction={'column'} spacing="10" width={'full'}>
          <Submissions />
          <Tracks />
          <Collection />
          <Samples />
        </Stack>
      </Flex>
    </ProfileWrapper>
  );
};
