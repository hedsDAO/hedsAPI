import { Flex, Grid, GridItem, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { RefreshCollectionButton } from '@/common/buttons';
import { User } from '@/modules/profile/models/common';
import { isEmpty } from '@/utils';

const Collection = ({ userData, loading }: { userData: User; loading: boolean }) => {
  return (
    <Stack>
      <Flex justifyContent={'space-between'}>
        <Heading fontSize={'3xl'}>Collection</Heading>
        <RefreshCollectionButton userData={userData} loading={loading} />
      </Flex>
      <Grid className="px-3 py-3" templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }} gap={4}>
        {!isEmpty(userData?.collection) &&
          Object.values(userData?.collection).map((collectionItem) => {
            return (
              <GridItem key={collectionItem.name + collectionItem.quantity}>
                <Skeleton w="full" h="full" isLoaded={!loading} fadeDuration={2}>
                  <div className="relative">
                    <img
                      src={collectionItem.image}
                      className="object-cover lg:min-h-[12rem] lg:max-h-[12rem] lg:min-w-[12rem] lg:max-w-[12rem] aspect-square rounded-lg object-center hover:opacity-75"
                    />
                    <div className="absolute top-2 right-0 py-1 px-2 bg-white bg-opacity-70">x{collectionItem.quantity}</div>
                    <span>{collectionItem.name}</span>
                  </div>
                </Skeleton>
              </GridItem>
            );
          })}
      </Grid>
    </Stack>
  );
};

export default Collection;
