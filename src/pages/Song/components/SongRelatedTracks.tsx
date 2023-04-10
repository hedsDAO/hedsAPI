import { Song, User } from '@/models/common';
import { store } from '@/store';
import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RelatedTracks = () => {
  const similarSongs = useSelector(store.select.songModel.selectSimilarSongs);
  return (
    <Box px={16} pt={6} pb={14}>
      <SimpleGrid gap={2} columns={5}>
        {similarSongs?.length &&
          similarSongs
            .filter((song: Song) => song.public)
            .slice(0, 5)
            .map((song: Song) => {
              return (
                <Box to={`/song/${song.audio.split('/ipfs/')[1]}`} as={Link} key={song.id}>
                  <Image rounded="lg" src={song.cover} alt={song.track_name} />
                  <Text pt={1} fontFamily="poppins" fontSize="xs" opacity={'70%'} letterSpacing="wide" color="white">
                    {song.artists.map((artist: User) => (song?.public ? artist.display_name : song?.submission_data?.sub_id))}
                  </Text>
                </Box>
              );
            })}
      </SimpleGrid>
    </Box>
  );
};

export default RelatedTracks;
