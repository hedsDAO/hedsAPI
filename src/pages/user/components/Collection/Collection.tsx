import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import { isEmpty } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { CollectionCard } from '@/common/media';

const Collection = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const collection = useSelector(store.select.userModel.selectCurrentUserCollection);
  return (
    <Stack data-testid="user-collection-container">
      {!isEmpty(collection) ? (
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap={2}>
          {Object.values(collection).map((collectionItem, i) => {
            return (
              <GridItem data-testid={`user-collection-${i}`} key={collectionItem?.name + collectionItem?.quantity}>
                <CollectionCard item={collectionItem} loading={loading} />
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <Flex w="full">
          <div className="text-center w-full font-thin italic text-xs py-4">there's nothing here...</div>
        </Flex>
      )}
    </Stack>
  );
};

export default Collection;
