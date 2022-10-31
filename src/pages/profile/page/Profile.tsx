import { Stack, Flex } from '@chakra-ui/react';
import { ProfileWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, NameButton } from '@/pages/profile/components';
import { Badges, Collection, Description, DisplayName, ProfilePicture, Samples, Submissions, Tracks, Banner } from '@/common/user';

export const Profile = () => {
  return (
    <ProfileWrapper>
      <Banner />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={8} px={[10, 4, 2, 0]} py={4}>
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
        <Stack mt={{ base: '0', md: '36' }} direction={'column'} spacing="10" width={'full'}>
          <Tracks />
          <Submissions />
          <Collection />
          <Samples />
        </Stack>
      </Flex>
    </ProfileWrapper>
  );
};
