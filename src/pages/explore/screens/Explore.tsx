import { Box } from '@chakra-ui/react';
import { Stats } from '@/pages/explore/components/Stats/Stats';
import { Coverflow } from '@/pages/explore/components/Coverflow/Coverflow';
import { ExploreHeader } from '@/pages/explore/components/ExploreHeader/ExploreHeader';
import { FeaturedArtistsHeader } from '@/pages/explore/components/FeaturedArtistsHeader/FeaturedArtistsHeader';
import { CoverflowNav } from '@/pages/explore/components/CoverflowNav/CoverflowNav';

/**
 * @function Explore
 * @description Renders the explore page with headers, coverflow, stats and artists.
 * @returns {JSX.Element} - Rendered Explore component.
 **/

export const Explore = () => {
  return (
    <Box>
      <ExploreHeader />
      <Coverflow />
      <CoverflowNav />
      <Stats />
      <FeaturedArtistsHeader />
    </Box>
  );
};
