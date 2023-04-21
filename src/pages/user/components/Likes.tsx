import { LikedItem } from '@/common/media/LikedItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { Song } from '@/models/common';
import { store } from '@/store';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const Likes = () => {
  const likes = useSelector(store.select.userModel.selectLikes);
  const numOfLikes = useSelector(store.select.userModel.selectNumOfLikes);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  return (
    <GridItem colSpan={6}>
      <SimpleGrid gap={5} columns={{ base: 2, md: 4, xl: 4 }}>
        {likes?.slice(start, end).map((item: Song) => (
          <GridItem key={item.id + 'likes'} colSpan={1}>
            <LikedItem name={item.submission_data.sub_id} image={item.cover} />
          </GridItem>
        ))}
      </SimpleGrid>
      {numOfLikes > 4 && (
        <GridItem mt={4} colSpan={6}>
          <Pagination totalItems={numOfLikes} />
        </GridItem>
      )}
    </GridItem>
  );
};
