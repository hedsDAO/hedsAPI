import { useNavigate } from 'react-router-dom';
import { User } from '@/models/common';
import { GridItem, Stack, AspectRatio, Skeleton, Image, Text, useBoolean } from '@chakra-ui/react';

export const ArtistCard = ({ artist }: { artist: User }) => {
  const navigate = useNavigate();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <GridItem colSpan={1} key={artist.wallet}>
      <Stack border="solid 0.5px" borderColor={'heds.100'} p={2} rounded="md" bg="heds.bg4" onClick={() => navigate(`/u/${artist.wallet}`)}>
        <AspectRatio ratio={1}>
          <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={hasImageLoaded} fitContent rounded={'md'}>
            <Image minH="full" minW="full" rounded="md" onLoad={setHasImageLoaded.on} src={artist.profile_picture} objectFit="cover" />
          </Skeleton>
        </AspectRatio>
        <Text pl={1} color="white" opacity={'80%'} fontFamily={'inter'} fontWeight="medium" fontSize={'xs'}>
          {artist.display_name}
        </Text>
      </Stack>
    </GridItem>
  );
};
