import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import { Nav } from '@/components/Nav/Nav';
import { Banner } from '@/pages/user/components/Banner/Banner';
import { Collection } from '@/pages/user/components/Collection/Collection';
import { Details } from '@/pages/user/components/Details/Details';
import { Discography } from '@/pages/user/components/Discography/Discography';
import { Likes } from '@/pages/user/components/Likes/Likes';
import { ProfilePicture } from '@/pages/user/components/ProfilePicture/ProfilePicture';
import { RecentEvents } from '@/pages/user/components/RecentEvents/RecentEvents';
import { Spotlight } from '@/pages/user/components/Spotlight/Spotlight';
import { WalletAndVP } from '@/pages/user/components/WalletAndVP/WalletAndVP';
import { RefreshCollectionButton } from '@/pages/user/components/RefreshCollectionButton/RefreshCollectionButton';
import { UserNavTabs } from '@/pages/user/models/common';
import { Dispatch, store } from '@/store';

// Models & Constants
import { Box, Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import { USER_NAV_TABS } from '@pages/user/models/constants';
import { Metatags, MetatagTypes } from '@/common/utilities/Metatags';
import * as styles from '@pages/user/screens/styles';

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
  const user = useSelector(store.select.userModel.selectUser);

  // Get user data when wallet changes
  useEffect(() => {
    if (wallet?.length) dispatch.userModel.getUser(wallet);
    return () => {
      dispatch.userModel.setSpotlight(null);
    }
  }, [wallet]);

  // Reset pagination when tab changes
  useEffect(() => {
    dispatch.paginationModel.setCurrentPage(0);
    dispatch.paginationModel.setItemsPerPage(4);
  }, [currentTab]);

  return (
    <>
      {user ? (
        <Metatags user={user} type={MetatagTypes.USER}>
          <Box>
            <Banner />
            <Flex {...styles.$flexStyles}>
              <Stack {...styles.$stackStyles}>
                <ProfilePicture />
                <Details />
              </Stack>
              <WalletAndVP />
            </Flex>
            <Grid {...styles.$gridStyles}>
              <GridItem {...styles.$spotlightItemStyles}>
                <Spotlight />
              </GridItem>
              <GridItem {...styles.$recentEventsItemStyles}>
                <RecentEvents />
              </GridItem>
              <GridItem as={Flex} {...styles.$navItemStyles}>
                <Nav tabs={USER_NAV_TABS} />
                <RefreshCollectionButton />
              </GridItem>
              <GridItem {...styles.$navItemStyles}>
                {currentTab === UserNavTabs.COLLECTION && <Collection />}
                {currentTab === UserNavTabs.LIKES && <Likes />}
                {currentTab === UserNavTabs.DISCOGRAPHY && <Discography />}
              </GridItem>
            </Grid>
          </Box>
        </Metatags>
      ) : (
        <></>
      )}
    </>
  );
};
