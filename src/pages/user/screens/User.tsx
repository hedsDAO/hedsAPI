import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';

// Models & Constants
import { Box, Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import { FlexStyles, GridStyles, StackStyles, USER_NAV_TABS } from '@pages/user/models/constants';

// Components
import { Nav } from '@/components/Nav/Nav';
import { Details } from '@/pages/user/components/Details';
import { UserNavTabs } from '@/pages/user/models/common';
import { Banner } from '@pages/user/components/Banner';
import { Collection } from '@pages/user/components/Collection';
import { Discography } from '@pages/user/components/Discography';
import { Likes } from '@pages/user/components/Likes';
import { ProfilePicture } from '@pages/user/components/ProfilePicture';
import { RecentEvents } from '@pages/user/components/RecentEvents';
import { Spotlight } from '@/pages/user/components/Spotlight';
import { WalletAndVP } from '@pages/user/components/WalletAndVP';

/**
 * @function User
 * @returns {JSX.Element} The `User` component JSX element.
 * @description displays a user's banner, profile picture, details, and
 * various types of content depending on the currently selected tab.
 */

export const User = () => {
  const { wallet } = useParams<{ wallet: string }>();
  const dispatch = useDispatch<Dispatch>();
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);

  // Get user data when wallet changes
  useEffect(() => {
    if (wallet?.length) dispatch.userModel.getUser(wallet);
  }, [wallet]);

  // Reset pagination when tab changes
  useEffect(() => {
    dispatch.paginationModel.setCurrentPage(0);
    dispatch.paginationModel.setItemsPerPage(4);
  }, [currentTab]);

  return (
    <Box>
      <Banner />
      <Flex {...FlexStyles}>
        <Stack {...StackStyles}>
          <ProfilePicture />
          <Details />
        </Stack>
        <WalletAndVP />
      </Flex>
      <Grid {...GridStyles}>
        <GridItem rounded="lg" bg="heds.bg3" colSpan={{ base: 6, xl: 4 }}>
          <Spotlight />
        </GridItem>
        <GridItem rounded="lg" p={3} as={Stack} bg="heds.bg3" colSpan={{ base: 6, xl: 2 }}>
          <RecentEvents />
        </GridItem>
        <GridItem colSpan={6}>
          <Nav tabs={USER_NAV_TABS} />
        </GridItem>
        <GridItem colSpan={6}>
          {currentTab === UserNavTabs.COLLECTION && <Collection />}
          {currentTab === UserNavTabs.LIKES && <Likes />}
          {currentTab === UserNavTabs.DISCOGRAPHY && <Discography />}
        </GridItem>
      </Grid>
    </Box>
  );
};
