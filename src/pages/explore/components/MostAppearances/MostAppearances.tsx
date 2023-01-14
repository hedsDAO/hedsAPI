import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExploreArtistCard } from '@/pages/explore/components';
import { MOST_AP_BUTTON, MOST_AP_DESC, MOST_AP_TITLE } from '@/pages/explore/store/constants';
import { store } from '@/store';
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';

const MostAppearances = () => {
  const mostFeaturedArtists = useSelector(store.select.artistModel.selectMostFeaturedArtists);
  return (
    <Box px={{ base: 5, lg: 10 }} pt={10} pb={10} mx={{ lg: 'auto' }} maxW="7xl">
      <Heading color={'gray.600'} fontSize={{ base: 'lg', lg: 'xl' }} fontFamily="'Space Mono', monospace">
        {MOST_AP_TITLE}
      </Heading>
      <Text fontFamily="'Space Mono', monospace" mt={2} color={'gray.600'} fontSize="xs">
        {MOST_AP_DESC}
      </Text>
      <Flex mt={{ base: 2, lg: 0 }} w="full" justifyContent={'end'}>
        <Flex alignItems="center" gap={2}>
          <Text className="hover-underline-animation" fontSize="xs" textColor={'gray.600'} as={Link} to={'/artists'} role="link">
            {MOST_AP_BUTTON}
          </Text>
          <Icon color={'gray.600'} h="3" w="3" as={IconArrowRight} />
        </Flex>
      </Flex>
      <SimpleGrid justifyItems={{ base: 'start', lg: 'center' }} gap={4} mt={4} columns={{ base: 1, md: 2, xl: 4 }}>
        {mostFeaturedArtists && mostFeaturedArtists?.map((artist) => <ExploreArtistCard key={artist.wallet} artist={artist} />)}
      </SimpleGrid>
    </Box>
  );
};
export default MostAppearances;
