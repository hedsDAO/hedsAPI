import { Divider, Flex, Grid, GridItem, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { RefreshCollectionButton } from '@/common/buttons';
import { User } from '@/models/common';
import { isEmpty } from '@/utils';

const Collection = ({ userData, loading }: { userData: User; loading: boolean }) => {
  return (
    <Stack>
      <Flex justifyContent={'space-between'} alignItems="center">
        <Heading color={'gray.700'} fontSize={'3xl'}>
          Collection
        </Heading>
        <RefreshCollectionButton userData={userData} loading={loading} />
      </Flex>
      <Divider pt={0} mt={0} border={'1px'} size="md" />
      <Grid className="py-2" templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
        {!isEmpty(userData?.collection) &&
          Object.values(userData?.collection).map((collectionItem) => {
            return (
              <GridItem key={collectionItem?.name + collectionItem?.quantity}>
                <Skeleton w="full" h="fit-content" rounded="lg" isLoaded={!loading} fadeDuration={2}>
                  <div className="relative">
                    <img src={collectionItem?.image} className="object-cover aspect-square rounded-lg object-center hover:opacity-75" />
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
    </Stack>
  );
};

export default Collection;
