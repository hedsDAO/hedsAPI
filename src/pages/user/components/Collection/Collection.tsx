import { Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { RefreshCollectionButton } from '@/common/user';
import { formatWallet, isEmpty } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { TapeCard } from '@/common/media';

const Collection = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const collection = useSelector(store.select.userModel.selectCurrentUserCollection);
  const displayName = useSelector(store.select.userModel.selectCurrentUserDisplayName);
  const wallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  return (
    <Stack data-testid="user-collection-container">
      <Flex py={2} justifyContent={'space-between'}>
        <Flex px={2}>
          <Text fontWeight={'medium'} fontStyle="italic" letterSpacing={'tight'} textColor={'gray.700'}>
            {displayName || formatWallet(wallet)}
          </Text>
          <Text fontWeight={'light'} fontStyle="italic" letterSpacing={'tight'} textColor={'gray.700'}>
            's collection
          </Text>
        </Flex>
        <RefreshCollectionButton />
      </Flex>
      {!isEmpty(collection) ? (
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap={2}>
          {Object.values(collection).map((collectionItem, i) => {
            return (
              <GridItem data-testid={`user-collection-${i}`} key={collectionItem?.name + collectionItem?.quantity}>
                <TapeCard item={collectionItem} loading={loading} />
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
