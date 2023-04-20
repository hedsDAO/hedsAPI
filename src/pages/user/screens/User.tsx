import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { Box, Flex, Grid, GridItem, SimpleGrid, Stack } from '@chakra-ui/react';

import { ProfilePicture } from '@pages/user/components/ProfilePicture';
import { Details } from '@/pages/user/components/Details';
import { Banner } from '@pages/user/components/Banner';
import { RecentEvents } from '@pages/user/components/RecentEvents';
import { Spotlight } from '@pages/user/components/Spotlight';
import { WalletAndVP } from '@pages/user/components/WalletAndVP';
import { Nav } from '@/components/Nav/Nav';
import { UserNavTabs } from '@/pages/user/models/common';
import { CollectionItem } from '@/common/media/CollectionItem';
import { LikedItem } from '@/common/media/LikedItem';
import { Song } from '@/models/common';
import { TrackItem } from '@/common/media/TrackItem';

export const User = () => {
  const { wallet } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);
  const collection = useSelector(store.select.userModel.selectCollection);
  const likes = useSelector(store.select.userModel.selectLikes);
  const songs = useSelector(store.select.userModel.selectSongs);

  useEffect(() => {
    if (wallet?.length) dispatch.userModel.getUser(wallet);
  }, [wallet]);

  return (
    <Box>
      <Banner />
      <Flex
        justifyContent={{ base: 'center', lg: 'space-between' }}
        alignItems={{ base: 'end', lg: 'baseline' }}
        direction={{ base: 'column', lg: 'row' }}
        mt={3}
        maxW={{ base: 'full', lg: '3xl', xl: '6xl' }}
        mx="auto"
      >
        <Flex
          alignSelf={'center'}
          alignItems={{ base: 'center' }}
          justifyContent={{ base: 'center', lg: 'start' }}
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 2, lg: 5 }}
        >
          <ProfilePicture />
          <Details />
        </Flex>
        <WalletAndVP />
      </Flex>
      <Grid mt={20} gap={5} maxW={'6xl'} mx="auto" templateRows="repeat(2, 1fr)" templateColumns="repeat(6, 1fr)">
        <GridItem rounded='lg' h={'fit-content'} px={5} py={3} as={Stack} bg="heds.bg2" colSpan={2} rowSpan={2}>
          <RecentEvents />
        </GridItem>
        <GridItem rounded='lg' w="full" h="full" bg="heds.bg2" colSpan={4} rowSpan={1}>
          <Spotlight />
        </GridItem>
        <GridItem w="full" h="full" colSpan={4} rowSpan={1}>
          <Nav tabs={['Collection', 'Likes', 'Tracks']} />
          {currentTab === UserNavTabs.COLLECTION && !!collection && (
            <SimpleGrid mt={4} gap={3} columns={4}>
              {Object.values(collection)
                ?.slice(0, 4)
                .map((item: any) => (
                  <GridItem key={item.name + 'col'} colSpan={1}>
                    <CollectionItem name={item.name} image={item.image} />
                  </GridItem>
                ))}
            </SimpleGrid>
          )}
          {currentTab === UserNavTabs.LIKES && (
            <SimpleGrid mt={4} gap={3} columns={4}>
              {likes?.slice(0, 4).map((item: Song) => (
                <GridItem key={item.id + 'likes'} colSpan={1}>
                  <LikedItem name={item.submission_data.sub_id} image={item.cover} />
                </GridItem>
              ))}
            </SimpleGrid>
          )}
          {currentTab === UserNavTabs.TRACKS && (
            <SimpleGrid mt={4} gap={3} columns={4}>
              {songs?.slice(0, 4).map((item: Song) => (
                <GridItem key={item.id + 'tracks'} colSpan={1}>
                  <TrackItem name={item.submission_data.sub_id} image={item.cover} />
                </GridItem>
              ))}
            </SimpleGrid>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};
