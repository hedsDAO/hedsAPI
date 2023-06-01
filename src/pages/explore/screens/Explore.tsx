import { Box } from '@chakra-ui/react';
import { Stats } from '@/pages/explore/components/Stats/Stats';
import { Coverflow } from '@/pages/explore/components/Coverflow/Coverflow';
import { FeaturedArtistsHeader } from '@/pages/explore/components/FeaturedArtistsHeader/FeaturedArtistsHeader';
import { CoverflowNav } from '@/pages/explore/components/CoverflowNav/CoverflowNav';
import { FeaturedArtists } from '@/pages/explore/components/FeaturedArtists/FeaturedArtists';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

/**
 * @function Explore
 * @description Renders the explore page with headers, coverflow, stats and artists.
 * @returns {JSX.Element} - Rendered Explore component.
 **/

export const Explore = () => {
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.exploreModel.getFeaturedArtists();
  }, []);

  return (
    <Box>
      <Coverflow />
      <CoverflowNav />
      <Stats />
      {/* TODO: add featured artists section */}
      {/* <FeaturedArtistsHeader />
      <FeaturedArtists /> */}
    </Box>
  );
};
