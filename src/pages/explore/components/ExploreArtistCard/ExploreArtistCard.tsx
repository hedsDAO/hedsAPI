import { useNavigate } from 'react-router-dom';
import { User } from '@/models/common';
import { Avatar, AvatarGroup, Box, Button, Container, Flex, Icon, Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';

const ExploreArtistCard = ({ artist }: { artist: User }) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const navigate = useNavigate();
  return (
    <Box w="full">
      <Container px="0" pos={'relative'}>
        <Skeleton rounded="2xl" h={{ base: '7rem', lg: '10rem' }} w="full" isLoaded={hasImageLoaded}>
          <Image
            onLoad={setHasImageLoaded.on}
            shadow="sm"
            border="1px"
            rounded="2xl"
            minW={'full'}
            maxH={{ base: '7rem', lg: '10rem' }}
            objectFit={'cover'}
            src={artist?.profilePicture}
          />
          <Flex justifyContent={'space-between'} zIndex={'50'} top="2" left="2" position={'absolute'}>
            <Button
              onClick={() => {
                window.scroll(0, 0);
                navigate(`/u/${artist.wallet}`);
              }}
              variant={'explore'}
              size="xs"
            >
              / {artist?.displayName}
            </Button>
          </Flex>
          <Flex justifyContent={'space-between'} zIndex={'50'} top="2" right="2" position={'absolute'}>
            <Button
              onClick={() => {
                window.scroll(0, 0);
                navigate(`/u/${artist.wallet}`);
              }}
              px={2}
              variant={'explore'}
              size="xs"
            >
              <Icon color="gray.600" h="4" w="4" as={IconArrowRight}></Icon>
            </Button>
          </Flex>
        </Skeleton>
        <Box mt={2} py={2} px={2} position={'relative'}>
          <AvatarGroup spacing={{ base: -2, lg: -2 }} size={{ base: 'xs', lg: 'sm' }}>
            {Object.values(artist?.tracks?.['heds']?.['hedstape']).map((track) => (
              <Avatar
                shadow="md"
                _hover={{ saturate: 0 }}
                transition="ease-in-out duration-300"
                role="button"
                onClick={() => navigate(`/listen/${track.space}/${track.tape}/${track.id}`)}
                key={track.audio}
                size={'sm'}
                name={track.album}
                src={track.cover}
              />
            ))}
          </AvatarGroup>
        </Box>
      </Container>
    </Box>
  );
};

export default ExploreArtistCard;
