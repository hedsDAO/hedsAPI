import { Flex, Stack } from '@chakra-ui/react';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, SplitsBalanceAlert } from '../components';
import { Tracks, Submissions, ProfilePicture, DisplayName, Description, Collection, Badges, Samples, Banner } from '@/common/user';

export const User = () => {
  return (
    <div className="">
      <Banner />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={[2, 4, 8, 12]} px={[12, 8, 4, 2]} py={2}>
        <Stack direction={'column'}>
          <ProfilePicture />
          <SettingsButton />
          <Flex flexDirection={'column'} gap={6} pt={2} alignItems={'start'}>
            <Badges />
            <DisplayName />
          </Flex>
          <Description />
          <Flex alignItems={'end'} direction={'row'} gap={2} pt={2}>
            <TwitterLinkButton />
            <CopyWalletButton />
            <VerifyTwitterButton />
          </Flex>
        </Stack>
        <Stack mt={{ base: '0', md: '36' }} direction={'column'} spacing="10" width={'full'}>
          <SplitsBalanceAlert />
          <Tracks />
          <Collection />
          <Samples />
          <Submissions />
        </Stack>
      </Flex>
    </div>
  );
};
