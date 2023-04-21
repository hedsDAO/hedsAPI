import { useSelector } from 'react-redux';
import { CollectionItem } from '@/common/media/CollectionItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { store } from '@/store';
import { isEmpty } from '@/utils';
import { GridItem, SimpleGrid } from '@chakra-ui/react';

export const Collection = () => {
  const collection = useSelector(store.select.userModel.selectCollection);
  const numOfItems = useSelector(store.select.userModel.selectNumOfCollections);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  return (
    <GridItem colSpan={6}>
      <SimpleGrid gap={5} columns={{ base: 2, md: 4, xl: 4 }}>
        {!isEmpty(collection) &&
          Object.values(collection)
            .slice(start, end)
            .map((item: any) => (
              <GridItem key={item.name + 'col'} colSpan={1}>
                <CollectionItem name={item.name} image={item.image} />
              </GridItem>
            ))}
      </SimpleGrid>
      {numOfItems > 4 ? (
        <GridItem mt={4} colSpan={6}>
          <Pagination totalItems={numOfItems} />
        </GridItem>
      ) : <></>}
    </GridItem>
  );
};
