import { useSelector } from 'react-redux';
import { TrackItem } from '@/common/media/TrackItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { store } from '@/store';
import { AspectRatio, Box, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import * as styles from '@pages/user/components/Discography/styles';

/**
 * @function Discography
 * @description Renders a users' discography of their tracks.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Discography = () => {
  const songs = useSelector(store.select.userModel.selectSongs);
  const numOfSongs = useSelector(store.select.userModel.selectNumOfSongs);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  return (
    <GridItem {...styles.$mainContainerStyles}>
      <SimpleGrid {...styles.$discographyGridStyles}>
        {songs?.length
          ? songs?.slice(start, end).map((item) => (
              <GridItem key={item.id + item.cover}>
                <TrackItem name={item.submission_data.sub_id} image={item.cover} />
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
      </SimpleGrid>
      {numOfSongs > 4 && (
        <GridItem {...styles.$paginationContainerStyles}>
          <Pagination totalItems={numOfSongs} />
        </GridItem>
      )}
    </GridItem>
  );
};
