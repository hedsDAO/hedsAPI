import { Grid, GridItem, Stack, Flex, AspectRatio, Box, Text, Image, Avatar, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Song } from '@/models/common';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

const SongHeader = ({ song }: { song: Song }) => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  return (
    <Grid maxW="full" templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(10, 1fr)' }} gap={6}>
      {/* <GridItem colSpan={{ base: 1, xl: 7 }}>
        <Stack
          px={{ base: 4, xl: 0 }}
          direction={{ base: 'row', xl: 'column' }}
          mt={{ base: 3, xl: '-10' }}
          pl={{ xl: 20 }}
          gap={4}
          justifyContent={{ base: 'space-between', xl: 'center' }}
          h="full"
        >
          <Flex direction="column">
            <Text letterSpacing={'widest'} fontSize={'xs'} textColor={'gray.500'}>
              TRACK
            </Text>
            <Text letterSpacing={'widest'} fontSize={{ base: 'md', xl: '2xl' }}>
              {song?.submission_data?.sub_id}
            </Text>
          </Flex>
          <Flex alignItems={{ base: 'end', xl: 'start' }} direction="column">
            <Text letterSpacing={'widest'} fontSize={'xs'} textColor={'gray.500'}>
              ARTIST
            </Text>
          </Flex>
          <Flex display={{ base: 'none', xl: 'flex' }} pt={6} gap={3}>
            <IconButton onClick={() => dispatch.globalAudioModel.setCurrentSong(song)} aria-label="play-button" icon={<PlayIcon width={30}></PlayIcon>} />
            <HeartIcon onClick={() => navigate('/tape/123')} width={30}></HeartIcon>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem mt={'-1'} colSpan={{ base: 1, xl: 3 }}>
        <AspectRatio ratio={1}>
          <Box>
            <Image opacity={{ base: '35%', xl: '20%' }} filter={'blur(4px)'} rounded="none" src={song?.cover} />
            <Avatar m="2" shadow="md" borderRadius={'sm'} src={song?.submission_data?.sub_image} size="lg" position="absolute" />
          </Box>
        </AspectRatio>
      </GridItem> */}
    </Grid>
  );
};

export default SongHeader;
