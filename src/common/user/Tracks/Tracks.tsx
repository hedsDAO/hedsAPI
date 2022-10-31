import { Fragment } from 'react';
import { Divider, Flex, Grid, GridItem, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectUserTracks } from '@/pages/user/store/selectors';

const Tracks = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userTracks = useSelector(selectUserTracks);

  return (
    <Fragment>
      {userTracks && (
        <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
          <Heading fontSize={'3xl'}>Featured On</Heading>
          <Divider />
          <Grid className="py-2" templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
            {Object.entries(userTracks).map(([id, tape]) => {
              return (
                <GridItem key={tape.wallet + id}>
                  <Skeleton mt={1} rounded="lg" h="fit-content" isLoaded={!loading} fadeDuration={2}>
                    <img className="object-cover aspect-square rounded-lg object-center hover:opacity-75" src={tape?.cover} />
                  </Skeleton>
                  <Flex justifyContent={'space-between'} alignItems="baseline">
                    <Text fontSize={'sm'} letterSpacing={'tight'} fontWeight={'semibold'}>
                      {tape.tape}
                    </Text>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
        </Skeleton>
      )}
    </Fragment>
  );
};

export default Tracks;
