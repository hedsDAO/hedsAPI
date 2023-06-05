import { useSelector } from 'react-redux';
import { LikedItem } from '@/common/media/LikedItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { Song } from '@/models/common';
import { store } from '@/store';
import { AspectRatio, Box, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import * as styles from '@pages/user/components/Likes/styles';

/**
 * @function Likes
 * @description Renders a users' liked tracks.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Likes = () => {
  const likes = useSelector(store.select.userModel.selectLikes);
  const numOfLikes = useSelector(store.select.userModel.selectNumOfLikes);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const handleLikeEmptyStates = () => {
    const itemsOnCurrentPage = likes?.slice(start, end)?.length;
    return likes?.length < 4 ? 4 - likes?.length : itemsOnCurrentPage < 4 ? 4 - itemsOnCurrentPage : 0;
  };

  return (
    <GridItem {...styles.$mainContainerStyles}>
      <SimpleGrid {...styles.$likesGridStyles}>
        {likes?.length
          ? likes?.slice(start, end).map((item: Song) => (
              <GridItem key={item.id + item.cover}>
                <LikedItem link={item?.audio?.split('/ipfs/')[1]} name={item.submission_data.sub_id} image={item.cover} />
              </GridItem>
            ))
          : [0, 1, 2, 3].map((_, index: number) => (
              <GridItem {...styles.$gridItemStyles} key={index}>
                <Box {...styles.$emptyCollectionBoxStyles}>
                  <AspectRatio ratio={1}>
                    <Box {...styles.$emptyBoxStyles} />
                  </AspectRatio>
                  <Text {...styles.$emptyTextStyles} />
                </Box>
              </GridItem>
            ))}
        {likes?.length > 0 && Array.from(Array(handleLikeEmptyStates()).keys()).map((i: number) => (
          <GridItem {...styles.$gridItemStyles} key={i + 'likes-empty'}>
            <Box {...styles.$emptyCollectionBoxStyles}>
              <AspectRatio ratio={1}>
                <Box {...styles.$emptyBoxStyles} />
              </AspectRatio>
              <Text {...styles.$emptyTextStyles} />
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
      {numOfLikes > 4 && (
        <GridItem {...styles.$paginationContainerStyles}>
          <Pagination totalItems={numOfLikes} />
        </GridItem>
      )}
    </GridItem>
  );
};
