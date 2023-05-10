import { Pagination } from '@/components/Pagination/Pagination';
import { Song } from '@/models/common';
import { store } from '@/store';
import { AspectRatio, Box, GridItem, Image, SimpleGrid, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles';

/**
 * @function Related
 * @description Renders a component that displays related songs with pagination if necessary.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Related = () => {
  const navigate = useNavigate();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const songHash = useSelector(store.select.songModel.selectSongHash);
  const relatedSongs = useSelector(store.select.songModel.selectRelatedSongs);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  const handleNavigate = (song: Song) => () => navigate(`/song/${song?.audio?.split('/ipfs/')[1]}`);
  const handleEmptyRelatedTracks = () => {
    const itemsOnCurrentPage = relatedSongs?.slice(start, end)?.length;
    return relatedSongs?.length < 6 ? 6 - relatedSongs?.length : itemsOnCurrentPage < 6 ? 6 - itemsOnCurrentPage : 0;
  };

  return (
    <SimpleGrid {...styles.$simpleGridStyles}>
      {relatedSongs?.length
        ? relatedSongs?.slice(start, end)?.map((song: Song, index: number) => (
            <GridItem key={songHash + song.id + index} {...styles.$gridItemStyles} data-testid={`song-related-${index}`}>
              <Box onClick={handleNavigate(song)} {...styles.$relatedBoxStyles}>
                <AspectRatio {...styles.$aspectRatioStyles}>
                  <Skeleton {...styles.$skeletonStyles} isLoaded={hasImageLoaded}>
                    <Image onLoad={setHasImageLoaded.on} src={song?.cover} {...styles.$imageStyles} />
                  </Skeleton>
                </AspectRatio>
                <Text {...styles.$songTextStyles}>{song?.track_name || song?.submission_data?.sub_id}</Text>
              </Box>
            </GridItem>
          ))
        : [0, 1, 2, 3, 4, 5].map((_, index: number) => (
            <GridItem key={index + relatedSongs?.[0].audio || 0 + songHash} {...styles.$gridItemStyles}>
              <Box {...styles.$placeholderBoxStyles}>
                <AspectRatio {...styles.$aspectRatioStyles}>
                  <Skeleton {...styles.$skeletonStyles} isLoaded={false}>
                    <Box {...styles.$loadingBoxStyles} />
                  </Skeleton>
                </AspectRatio>
                <Text {...styles.$placeholderTextStyles}></Text>
              </Box>
            </GridItem>
          ))}
      {Array.from(Array(handleEmptyRelatedTracks()).keys()).map((i: number) => (
        <GridItem key={songHash + i} {...styles.$emptyRelatedGridItemStyles} data-testid={`song-related-empty-${i}`}>
          <Box {...styles.$emptyRelatedBoxStyles}>
            <AspectRatio {...styles.$aspectRatioStyles}>
              <Skeleton {...styles.$skeletonStyles} isLoaded={hasImageLoaded}>
                <Box {...styles.$loadingBoxStyles} />
              </Skeleton>
            </AspectRatio>
            <Text {...styles.$placeholderTextStyles}></Text>
          </Box>
        </GridItem>
      ))}
      {relatedSongs?.length > 6 && (
        <GridItem {...styles.$paginationContainerStyles}>
          <Pagination totalItems={relatedSongs?.length} />
        </GridItem>
      )}
    </SimpleGrid>
  );
};
