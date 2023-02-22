import { Divider, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { isEmpty } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { CollectionCard } from '@/common/media';
import { DateTime } from 'luxon';
import { tapesAndVpWeights } from '@/modules/wrappers/store/userModel';

const Collection = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const collection = useSelector(store.select.userModel.selectCurrentUserCollection);
  const getTapeVp = (address: string) => (tapesAndVpWeights[address] ? tapesAndVpWeights[address] : 0);
  return (
    <Stack py={2} data-testid="user-collection-container">
      {!isEmpty(collection?.items) ? (
        <div>
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap={2}>
            {Object.entries(collection?.items).map((collectionEntry, i) => {
              const [address, collectionItem] = collectionEntry;
              return (
                <GridItem data-testid={`user-collection-${i}`} key={collectionItem?.name + collectionItem?.quantity}>
                  <CollectionCard item={collectionItem} tapeVp={getTapeVp(address.toLowerCase())} loading={loading} />
                </GridItem>
              );
            })}
          </Grid>
          <Flex justifyContent={'start'} p={1}>
            {collection?.lastUpdated > 0 && (
              <Text fontFamily={'"Space Mono", monospace'} py={3} px={1} textColor={'gray.500'} fontSize={'2xs'}>
                last updated:{' '}
                {DateTime.fromMillis(collection?.lastUpdated).toLocaleString({
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            )}
          </Flex>
        </div>
      ) : (
        <div>
          <Grid display={{ base: 'none', sm: 'grid' }} templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap={2}>
            {['', '', '', '', ''].map((_, i) => {
              return (
                <GridItem rounded="sm" border={'1px'} borderColor={'gray.300'} colSpan={1} data-testid={`user-collection-${i}`} key={i + 'empty-collection'}>
                  <Stack bg="gray.100" opacity={'20%'} divider={<Divider />} rounded="sm" p={2} shadow="sm">
                    <div className="relative">
                      <div className="object-cover aspect-square rounded-lg object-center shadow-md" />
                    </div>
                    <span className="px-1 tracking-tight text-xs text-gray-600 font-medium h-6">{''}</span>
                  </Stack>
                </GridItem>
              );
            })}
          </Grid>
          <Grid display={{ base: 'grid', sm: 'none' }} templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap={2}>
            {['', ''].map((_, i) => {
              return (
                <GridItem border={'1px'} borderColor={'gray.300'} rounded="sm" colSpan={1} data-testid={`user-collection-${i}`} key={i + 'empty-collection'}>
                  <Stack bg="gray.100" opacity={'20%'} divider={<Divider />} rounded="sm" p={2} shadow="sm">
                    <div className="relative">
                      <div className="object-cover aspect-square rounded-lg object-center shadow-md" />
                    </div>
                    <span className="px-1 tracking-tight text-xs text-gray-600 font-medium h-6">{''}</span>
                  </Stack>
                </GridItem>
              );
            })}
          </Grid>
          <Flex justifyContent={'space-between'}>
            <Text py={2} px={1} textColor={'gray.500'} fontSize={'2xs'}>
              there's nothing here...
            </Text>
            {collection?.lastUpdated > 0 && (
              <Text fontFamily={'"Space Mono", monospace'} py={2} px={1} textColor={'gray.500'} fontSize={'2xs'}>
                last updated:{' '}
                {DateTime.fromMillis(collection?.lastUpdated).toLocaleString({
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            )}
          </Flex>
        </div>
      )}
    </Stack>
  );
};

export default Collection;
