import { User } from '@/models/common';
import { store } from '@/store';
import { AspectRatio, Box, GridItem, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const FeaturedArtists = () => {
  const featuredArtists = useSelector(store.select.exploreModel.selectFeaturedArtists);

  return (
    <SimpleGrid px={{ base: 5, lg: 0 }} gap={2} maxW={{ lg: '6xl' }} mx="auto" columns={{ base: 1, lg: 3 }}>
      {featuredArtists?.length && featuredArtists?.map((user: User) => {
        return (
          <GridItem colSpan={1}>
            <AspectRatio h="full" ratio={1}>
              <Image rounded="sm" border="solid 1px" borderColor="heds.100" objectFit={'cover'} h="full" src={user.profile_picture} />
            </AspectRatio>
            <Text fontSize={'xs'} letterSpacing="wide" color="white" opacity="70%" as={Link} to={`/u/${user.wallet}`}>
              {user.display_name}
            </Text>
          </GridItem>
        );
      })}
    </SimpleGrid>
  );
};
