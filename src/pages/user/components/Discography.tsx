import { TrackItem } from '@/common/media/TrackItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { Song } from '@/models/common';
import { store } from '@/store';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const Discography = () => {
  const songs = useSelector(store.select.userModel.selectSongs);
  const numOfSongs = useSelector(store.select.userModel.selectNumOfSongs);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  return (
    <GridItem colSpan={6}>
      <SimpleGrid gap={5} columns={{ base: 2, md: 4, xl: 4 }}>
        {songs?.length &&
          songs?.slice(start, end).map((item) => (
            <GridItem key={item.id + 'discog'} colSpan={1}>
              <TrackItem name={item.submission_data.sub_id} image={item.cover} />
            </GridItem>
          ))}
      </SimpleGrid>
      {numOfSongs > 4 && (
        <GridItem mt={4} colSpan={6}>
          <Pagination totalItems={numOfSongs} />
        </GridItem>
      )}
    </GridItem>
  );
};
