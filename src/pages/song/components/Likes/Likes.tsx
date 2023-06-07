import { Pagination } from '@/components/Pagination/Pagination';
import { store } from '@/store';
import { AspectRatio, Box, GridItem, Image, SimpleGrid, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SongLikeData } from '../../models/common';
import * as styles from './styles';

/**
 * @function Likes
 * @description Renders a component that displays the users who liked the song, with pagination if necessary.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Likes = () => {
  const navigate = useNavigate();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const songLikes = useSelector(store.select.songModel.selectSongLikes);
  const songHash = useSelector(store.select.songModel.selectSongHash);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  const handleNavigate = (wallet: string) => () => navigate(`/u/${wallet}`);
  const handleLikeEmptyStates = () => {
    const itemsOnCurrentPage = songLikes?.slice(start, end)?.length;
    return songLikes?.length < 6 ? 6 - songLikes?.length : itemsOnCurrentPage < 4 ? 4 - itemsOnCurrentPage : 0;
  };
  return (
    <SimpleGrid {...styles.$likesGridStyles}>
      {songLikes?.length
        ? songLikes?.slice(start || 0, end || songLikes?.length)?.map((likes: SongLikeData, index: number) => (
            <GridItem key={songHash + likes.user_id + index} {...styles.$gridItemStyles} data-testid={`song-likes-${index}`}>
              <Box {...styles.$likesBoxStyles(handleNavigate(likes.wallet), false)}>
                <Skeleton {...styles.$skeletonStyles} isLoaded={hasImageLoaded}>
                  <AspectRatio {...styles.$aspectRatioStyles}>
                    <Image {...styles.$imageStyles} onLoad={setHasImageLoaded.on} src={likes?.profile_picture} />
                  </AspectRatio>
                </Skeleton>
                <Text {...styles.$userTextStyles}>{likes?.display_name}</Text>
              </Box>
            </GridItem>
          ))
        : [0, 1, 2, 3].map((_, index: number) => (
            <GridItem key={songHash + index} {...styles.$gridItemStyles}>
              <Box {...styles.$likesBoxStyles(() => {}, true)}>
                <AspectRatio ratio={1}>
                  <Box {...styles.$emptyBoxStyles} />
                </AspectRatio>
                <Text {...styles.$emptyTextStyles} />
              </Box>
            </GridItem>
          ))}
      {Array.from(Array(handleLikeEmptyStates()).keys()).map((i: number) => (
        <GridItem data-testid={`song-likes-empty-${i}`} key={songHash + i} {...styles.$gridItemStyles}>
          <Box {...styles.$likesBoxStyles(() => {}, true)}>
            <AspectRatio ratio={1}>
              <Box {...styles.$emptyBoxStyles} />
            </AspectRatio>
            <Text {...styles.$emptyTextStyles} />
          </Box>
        </GridItem>
      ))}
      {songLikes?.length > 6 && (
        <GridItem {...styles.$paginationContainerStyles}>
          <Pagination totalItems={songLikes?.length} />
        </GridItem>
      )}
    </SimpleGrid>
  );
};
