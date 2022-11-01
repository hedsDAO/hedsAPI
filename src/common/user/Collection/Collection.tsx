import { Divider, Flex, Grid, GridItem, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { RefreshCollectionButton } from '@/common/buttons';
import { User } from '@/models/common';
import { isEmpty } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectUserCollection } from '@/pages/user/store/selectors';

const Collection = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const collection = useSelector(selectUserCollection);
  return (
    <Stack data-testid="user-collection-container">
      <Flex justifyContent={'space-between'} alignItems="center">
        <Heading color={'gray.700'} fontSize={'3xl'}>
          Collection
        </Heading>
        <RefreshCollectionButton />
      </Flex>
      <Divider pt={0} mt={0} border={'1px'} size="md" />
      {!isEmpty(collection) ? (
        <Grid className="py-2" templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
          {Object.values(collection).map((collectionItem, i) => {
            return (
              <GridItem data-testid={`user-collection-${i}`} key={collectionItem?.name + collectionItem?.quantity}>
                <Skeleton w="full" h="fit-content" rounded="lg" isLoaded={!loading} fadeDuration={2}>
                  <div className="relative">
                    <img src={collectionItem?.image} className="object-cover aspect-square rounded-lg object-center hover:opacity-75 shadow-md" />
                    <div className="text-xs absolute top-2 right-0 py-0.5 px-2 bg-white bg-opacity-70 rounded-l-lg">x{collectionItem.quantity}</div>
                  </div>
                </Skeleton>
                <Skeleton mt={1} rounded="lg" h="20px" isLoaded={!loading} fadeDuration={2}>
                  <span className="px-0.5 tracking-wide text-sm text-gray-600 font-semibold">{collectionItem.name}</span>
                </Skeleton>
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
