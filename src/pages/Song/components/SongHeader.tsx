import { Dispatch, store } from '@/store';
import { Grid, GridItem, Stack, Flex, AspectRatio, Box, Text, Image, Avatar } from '@chakra-ui/react';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { mockSong, mockArtist, mockTape } from '../models/constant';
import { useNavigate } from 'react-router-dom';

const SongHeader = () => {
  const dispatch = useDispatch<Dispatch>();
  const wavesurfer = useSelector(store.select.persistentAudioModel.selectWavesurfer);
  const isPlaying = useSelector(store.select.persistentAudioModel.selectIsPlaying);
  const navigate = useNavigate();
  return (
    <Grid maxW="full" templateColumns="repeat(10, 1fr)" gap={6}>
      <GridItem colSpan={7}>
        <Stack mt="-10" pl={20} gap={4} justifyContent={'center'} h="full">
          <Flex direction="column">
            <Text letterSpacing={'widest'} fontSize={'xs'} textColor={'gray.500'}>
              TRACK
            </Text>
            <Text letterSpacing={'widest'} fontSize={'2xl'}>
              {JSON.parse(mockSong.submission_data)?.sub_id}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text letterSpacing={'widest'} fontSize={'xs'} textColor={'gray.500'}>
              ARTIST
            </Text>
            <Text letterSpacing={'widest'} fontSize={'2xl'}>
              {mockArtist?.display_name}
            </Text>
          </Flex>
          <Flex pt={6} gap={3}>
            <PlayIcon onClick={() => dispatch.persistentAudioModel.setIsPlaying(!isPlaying)} width={30}></PlayIcon>
            <HeartIcon onClick={() => navigate('/tape/123')} width={30}></HeartIcon>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem colSpan={3}>
        <AspectRatio ratio={1}>
          <Box>
            <Image filter={'blur(2px)'} rounded="none" src={mockTape.image} />
            <Avatar m="2" shadow="lg" borderRadius={'10'} src={JSON.parse(mockSong?.submission_data)?.sub_image} size="lg" position="absolute" />
          </Box>
        </AspectRatio>
      </GridItem>
    </Grid>
  );
};

export default SongHeader;
