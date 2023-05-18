import { useSelector } from 'react-redux';
import { CollectionItem } from '@/common/media/CollectionItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { store } from '@/store';
import { isEmpty } from '@/utils';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import * as styles from '@pages/user/components/Collection/styles';
import { TapeCollectionItem } from '@/models/common';

/**
 * @function Collection
 * @description Renders a users' collection of owned tapes.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Collection = () => {
  const collection = useSelector(store.select.userModel.selectCollection);
  const numOfItems = useSelector(store.select.userModel.selectNumOfCollections);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  return (
    <GridItem {...styles.$mainContainerStyles}>
      <SimpleGrid {...styles.$collectionGridStyles}>
        {!isEmpty(collection) &&
          Object.values(collection)
            .slice(start, end)
            .map((item: TapeCollectionItem) => (
              <GridItem key={item.name + item.image}>
                <CollectionItem item={item} />
              </GridItem>
            ))}
      </SimpleGrid>
      {numOfItems > 4 ? (
        <GridItem {...styles.$paginationContainerStyles}>
          <Pagination totalItems={numOfItems} />
        </GridItem>
      ) : (
        <></>
      )}
    </GridItem>
  );
};
