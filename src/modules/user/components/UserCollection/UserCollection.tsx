import { Flex, Grid, GridItem, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { User } from '@/modules/profile/models/common';
import { isEmpty } from '@/utils';

const UserCollection = ({ userData, loading }: { userData: User; loading: boolean }) => {
  return (
    <Stack>
      <Flex justifyContent={'space-between'}>
        <Heading fontSize={'3xl'}>Collection</Heading>
      </Flex>
      <Grid className="px-3 py-3" templateColumns="repeat(5, 1fr)" gap={4}>
        {!isEmpty(userData?.collection) &&
          Object.values(userData?.collection).map((collectionItem) => {
            return (
              <GridItem key={collectionItem.name + collectionItem.quantity}>
                <Skeleton w="full" h="full" isLoaded={!loading} fadeDuration={2}>
                  <img
                    src={collectionItem.image}
                    className="object-cover lg:min-h-[12rem] lg:max-h-[12rem] lg:min-w-[12rem] lg:max-w-[12rem] aspect-square rounded-lg object-center hover:opacity-75"
                  />
                  <Flex justifyContent={'space-between'}>
                    <span>{collectionItem.name}</span>
                    <span>x{collectionItem.quantity}</span>
                  </Flex>
                </Skeleton>
              </GridItem>
            );
          })}
      </Grid>
    </Stack>
  );
};

export default UserCollection;
