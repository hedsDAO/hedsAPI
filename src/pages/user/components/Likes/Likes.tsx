import { useSelector } from 'react-redux';
import { LikedItem } from '@/common/media/LikedItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { Song } from '@/models/common';
import { store } from '@/store';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
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
  return (
    <GridItem {...styles.$mainContainerStyles}>
      <SimpleGrid {...styles.$likesGridStyles}>
        {likes?.slice(start, end).map((item: Song) => (
          <GridItem key={item.id + item.cover}>
            <LikedItem name={item.submission_data.sub_id} image={item.cover} />
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
