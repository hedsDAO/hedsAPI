import { useEffect, useState } from 'react';
import { Button, Flex, Grid, GridItem, Heading, Image, Skeleton, Stack } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { User, UserCollection } from '@/modules/profile/models/common';
import useTapeOwnership from '@/hooks/useTapeOwnership';
import { Dispatch, store } from '@/store';
import { useDispatch } from 'react-redux';
import { isEmpty } from '@/utils';

const ProfileCollection = ({ profileData, loading }: { profileData: User; loading: boolean }) => {
  const [contractTapeData, setContractTapeData] = useState(null);
  const dispatch = useDispatch<Dispatch>();
  const collectionTapeData = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  const { data, refetch, isRefetching, isFetching } = useTapeOwnership(profileData?.wallet, collectionTapeData);

  useEffect(() => {
    if (data?.length && collectionTapeData) dispatch.profileModel.updateUserCollection([profileData.wallet, data]);
  }, [data, isRefetching, isFetching]);

  useEffect(() => {
    if (!isEmpty(collectionTapeData)) {
      if (isRefetching) setContractTapeData(collectionTapeData);
      if (isEmpty(profileData?.collection)) setContractTapeData(collectionTapeData);
    }
  }, [collectionTapeData]);

  return (
    <Stack>
      <Flex justifyContent={'space-between'}>
        <Heading fontSize={'3xl'}>Collection</Heading>
        <Button bg="gray.200" color="blackAlpha.900" onClick={() => refetch()}>
          <IconRefresh height={12} width={12} />
        </Button>
      </Flex>
      <Grid className="px-3 py-3" templateColumns="repeat(5, 1fr)" gap={4}>
        {profileData?.collection &&
          Object.values(profileData?.collection).map((collectionItem) => {
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

export default ProfileCollection;
