import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Flex, Grid, GridItem, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import { TapeData } from '@/models/common';

const Tracks = ({ loading, userTracks }: { loading: boolean; userTracks: { [key: string]: TapeData } }) => {
  return (
    <Fragment>
      {userTracks && (
        <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
          <Heading fontSize={'3xl'}>Featured On</Heading>
          <Divider />
          <Grid className="py-2" templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
            {Object.entries(userTracks).map(([id, tape]) => {
              return (
                <GridItem key={tape.contract + id}>
                  <Link to={tape?.route} key={id + tape?.contract}>
                    <Skeleton mt={1} rounded="lg" h="fit-content" isLoaded={!loading} fadeDuration={2}>
                      <img
                        className="object-cover aspect-square rounded-lg object-center hover:opacity-75"
                        src={tape?.image}
                      />
                    </Skeleton>
                  </Link>
                  <Flex justifyContent={'space-between'} alignItems="baseline">
                    <Text fontSize={'sm'} letterSpacing={'tight'} fontWeight={'semibold'}>
                      {tape.name}
                    </Text>
                    <Flex gap={0.5}>
                      <a target="_blank" href={tape.etherscan}>
                        <i className="fak fa-etherscan text-xs" />
                      </a>
                      <a target="_blank" href={tape.opensea}>
                        <i className="fak fa-opensea text-xs" />
                      </a>
                    </Flex>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
          {/* <div className="flex flex-row gap-4 flex-wrap py-3">
            {Object.entries(userTracks).map(([id, tape]) => {
              return (
                <Flex key={tape.contract + id} direction={'column'}>
                  <Link to={tape?.route} key={id + tape?.contract}>
                    <img
                      className="object-cover min-h-[4rem] max-h-[4rem] min-w-[6rem] max-w-[6rem] lg:min-h-[10rem] lg:max-h-[10rem] lg:min-w-[10rem] lg:max-w-[10rem] aspect-square rounded-lg object-center hover:opacity-75"
                      src={tape?.image}
                    />
                  </Link>
                  <Flex justifyContent={'space-between'} alignItems="baseline">
                    <Text fontSize={'sm'} letterSpacing={'tight'} fontWeight={'semibold'}>
                      {tape.name}
                    </Text>
                    <Flex gap={0.5}>
                      <a target="_blank" href={tape.etherscan}>
                        <i className="fak fa-etherscan text-xs" />
                      </a>
                      <a target="_blank" href={tape.opensea}>
                        <i className="fak fa-opensea text-xs" />
                      </a>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
          </div> */}
        </Skeleton>
      )}
    </Fragment>
  );
};

export default Tracks;
