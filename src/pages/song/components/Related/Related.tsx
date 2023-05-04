import { Song } from '@/models/common';
import { store } from '@/store';
import { AspectRatio, Box, GridItem, Image, SimpleGrid, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Related = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const navigate = useNavigate();
  const relatedSongs = useSelector(store.select.songModel.selectRelatedSongs);
  const handleNavigate = (song: Song) => () => navigate(`/song/${song?.audio?.split('/ipfs/')[1]}`);
  return (
    <SimpleGrid gap={5} pt={12} columns={6}>
      {relatedSongs?.length
        ? relatedSongs?.slice(0, 6)?.map((song: Song, index: number) => (
            <GridItem key={'related' + song.id} colSpan={1}>
              <Box onClick={handleNavigate(song)} border="solid 1px" borderColor="heds.100" rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2">
                <AspectRatio ratio={1}>
                  <Skeleton isLoaded={hasImageLoaded}>
                    <Image onLoad={setHasImageLoaded.on} border="solid 1px" borderColor="heds.100" rounded={'md'} src={song?.cover} />
                  </Skeleton>
                </AspectRatio>
                <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'}>
                  {song?.track_name || song?.submission_data?.sub_id}
                </Text>
              </Box>
            </GridItem>
          ))
        : [0, 1, 2, 3, 4, 5].map((_, index: number) => (
            <GridItem key={'related' + index} colSpan={1}>
              <Box border="solid 1px" borderColor="heds.100" rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2">
                <AspectRatio ratio={1}>
                  <Skeleton isLoaded={false}>
                    <Box h="full" w="full" border="solid 1px" borderColor="heds.100" rounded={'md'} />
                  </Skeleton>
                </AspectRatio>
                <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'} minH="2.5ch" minW="10ch"></Text>
              </Box>
            </GridItem>
          ))}
    </SimpleGrid>
  );
};
