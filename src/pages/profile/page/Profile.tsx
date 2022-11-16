import { Stack, Flex } from '@chakra-ui/react';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, SplitsBalanceAlert } from '@/pages/profile/components';
import { Badges, Collection, Description, DisplayName, ProfilePicture, Samples, Submissions, Tracks, Banner } from '@/common/user';
import { Fragment } from 'react';

export const Profile = () => {
  return (
    <Fragment>
      <Banner />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={[2, 4, 8, 10]} px={[12, 8, 4, 2]} py={2}>
        <Stack direction={'column'}>
          <ProfilePicture />
          <SettingsButton />
          <Flex flexDirection={'column'} gap={2} pt={2} alignItems={'start'}>
            <Badges />
            <DisplayName />
            <Description />
          </Flex>
          <Flex alignItems={'end'} direction={'row'} gap={2} pt={2}>
            <TwitterLinkButton />
            <CopyWalletButton />
            <VerifyTwitterButton />
          </Flex>
        </Stack>
        <Stack mt={{ base: '0', md: '40' }} direction={'column'} spacing="10" width={'full'}>
          <SplitsBalanceAlert />
          <Tracks />
          <Collection />
          <Samples />
          <Submissions />
        </Stack>
      </Flex>
    </Fragment>
  );
};
