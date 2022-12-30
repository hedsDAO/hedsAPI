import { useSelector } from 'react-redux';
import { CuratorCard } from '@/common/media';
import { User } from '@/models/common';
import { store } from '@/store';
import { Box, Container, Divider, Flex, HStack, Text } from '@chakra-ui/react';

const MostFeaturedArtists = () => {
  const mostFeaturedArtists = useSelector(store.select.artistModel.selectMostFeaturedArtists);
  return (
    <Flex direction="column" alignItems={'center'} w="full">
      <Box my={5}>
        <Container py={{ base: '4', md: '8' }}>
          <HStack>
            <Divider borderColor="gray.700" w="full" />
            <Text fontSize="lg" fontWeight="semibold" whiteSpace="nowrap" letterSpacing={'widest'}>
              MOST FEATURED ARTISTS
            </Text>
            <Divider borderColor="gray.700" w="full" />
          </HStack>
        </Container>
      </Box>
      <HStack>
        {mostFeaturedArtists?.length &&
          mostFeaturedArtists.map((curator: User) => {
            return (
              <HStack key={curator.wallet + curator.banner}>
                <CuratorCard curator={curator} />
              </HStack>
            );
          })}
      </HStack>
    </Flex>
  );
};

export default MostFeaturedArtists;
