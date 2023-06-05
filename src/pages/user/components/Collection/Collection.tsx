import { useSelector } from 'react-redux';
import { CollectionItem } from '@/common/media/CollectionItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { store } from '@/store';
import { isEmpty } from '@/utils';
import { AspectRatio, Box, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
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

  const handleLikeEmptyStates = () => {
    const itemsOnCurrentPage = Object.values(collection)?.slice(start, end)?.length;
    return Object.values(collection)?.length < 4 ? 4 - Object.values(collection)?.length : itemsOnCurrentPage < 4 ? 4 - itemsOnCurrentPage : 0;
  };

  return (
    <GridItem {...styles.$mainContainerStyles}>
      <SimpleGrid {...styles.$collectionGridStyles}>
        {!isEmpty(collection)
          ? Object.values(collection)
              .slice(start, end)
              .map((item: TapeCollectionItem) => (
                <GridItem key={item.name + item.image}>
                  <CollectionItem item={item} />
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
        {numOfItems > 0 &&
          Array.from(Array(handleLikeEmptyStates()).keys()).map((i: number) => (
            <GridItem {...styles.$gridItemStyles} key={i + 'collection-empty'}>
              <Box {...styles.$emptyCollectionBoxStyles}>
                <AspectRatio ratio={1}>
                  <Box {...styles.$emptyBoxStyles} />
                </AspectRatio>
                <Text {...styles.$emptyTextStyles} />
              </Box>
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
