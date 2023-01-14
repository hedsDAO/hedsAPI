import { User } from '@/models/common';
import { Flex, Button, Icon, Box, Text, Image, Container, Stack, AvatarGroup, Avatar } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const ExploreArtistCard = ({ artist }: { artist: User }) => {
  const navigate = useNavigate();
  return (
    <Box w="full">
      <Container px="0" pos={'relative'}>
        <Image shadow="sm" border="1px" rounded="2xl" minW={'full'} maxH={{ base: '7rem', lg: '10rem' }} objectFit={'cover'} src={artist?.profilePicture} />
        <Flex justifyContent={'space-between'} zIndex={'50'} top="2" left="2" position={'absolute'}>
          <Button variant={'explore'} size="xs">
            / {artist?.displayName}
          </Button>
        </Flex>
        <Flex justifyContent={'space-between'} zIndex={'50'} top="2" right="2" position={'absolute'}>
          <Button px={2} variant={'explore'} size="xs">
            <Icon color="gray.600" h="4" w="4" as={IconArrowRight}></Icon>
          </Button>
        </Flex>
        <Box py={2} px={2} position={'relative'}>
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
    // <Box>
    //   <Flex w="full" mb={{ base: '-10', lg: '-12' }} px={5} position={'relative'} justifyContent={'space-between'}>
    //     <Button
    //       onClick={() => navigate(`/u/${artist.wallet}`)}
    //       justifySelf={'start'}
    //       py={{ base: '2', lg: '4' }}
    //       px={{ base: '5', lg: '3' }}
    //       border="1px"
    //       borderColor="black"
    //       size={{ base: 'xs', lg: 'sm' }}
    //       rounded="full"
    //       bg="white"
    //     >
    //       <Text color="gray.600" fontWeight={'light'} fontFamily={'"Space Mono", monospace'}>
    //         {artist?.displayName}
    //       </Text>
    //     </Button>
    //     <Button
    //       onClick={() => navigate(`/u/${artist.wallet}`)}
    //       py={{ base: '2', lg: '4' }}
    //       px={{ base: '4', lg: '3' }}
    //       border="1px"
    //       borderColor="black"
    //       size={{ base: 'xs', lg: 'sm' }}
    //       rounded="full"
    //       bg="white"
    //       zIndex={'30'}
    //     >
    //       <Icon color="gray.600" h="4" w="4" as={IconArrowRight}></Icon>
    //     </Button>
    //   </Flex>
    //   <Image maxH="10rem" border="1px" borderColor={'black'} inset={'1'} rounded="3xl" w="full" objectFit={'cover'} src={artist?.profilePicture} />
    //   <Divider mt={3} mb={2} mx="auto" w="75%" />
    //   <Box pb={2} px={2} mb={4} position={'relative'}>
    //     <AvatarGroup spacing={{ base: -2, lg: -2 }} size={{ base: 'xs', lg: 'sm' }} max={8}>
    //       {Object.values(artist?.tracks?.['heds']?.['hedstape']).map((track) => (
    //         <Avatar
    //           shadow="sm"
    //           _hover={{ saturate: 0 }}
    //           transition="ease-in-out duration-300"
    //           role="button"
    //           onClick={() => navigate(`/listen/${track.space}/${track.tape}/${track.id}`)}
    //           key={track.audio}
    //           size={'sm'}
    //           name={track.album}
    //           src={track.cover}
    //         />
    //       ))}
    //     </AvatarGroup>
    //   </Box>
    // </Box>
  );
};

export default ExploreArtistCard;
