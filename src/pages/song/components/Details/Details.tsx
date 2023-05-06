import { useSelector } from 'react-redux';
import { Box, Flex, Grid, GridItem, SimpleGrid, Skeleton, Stack, Text } from '@chakra-ui/react';
import { store } from '@/store';
import RadialChart from '@/common/charts/RadialChart/RadialChart';
import SongEvent from '@/common/events/SongEvent';
import { Attribute } from '../Attribute/Attribute';
import { formatCyaniteGenres, formatCyaniteKeys, formatCyaniteSubGenres } from '@/utils';

export const Details = () => {
  const cyaniteData = useSelector(store.select.songModel.selectCyaniteData);
  const songEvents = useSelector(store.select.songModel.selectSongEvents);
  const numberOfAttributes = useSelector(store.select.songModel.selectNumberOfAttributes);
  const isLoading = useSelector(store.select.songModel.selectIsLoading);
  const songHash = useSelector(store.select.songModel.selectSongHash);

  const handleAttributeEmptyStates = (): number => {
    return numberOfAttributes < 8 ? 8 - numberOfAttributes : 0;
  };

  const handleEventEmptyStates = (): number => {
    return songEvents?.length < 3 ? 3 - songEvents?.length : 0;
  };
  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} columnGap={10}>
      <GridItem my={5} colSpan={1}>
        <Stack>
          <Text textTransform={'uppercase'} fontFamily={'karla'} fontWeight="medium" letterSpacing={'wide'} color="white" opacity={'50%'} fontSize="sm">
            RECENT
          </Text>
          <Stack justifyContent={'start'} gap={2}>
            {songEvents?.map((event) => (
              <Skeleton
                key={event.event_timestamp + 'key'}
                startColor="heds.bg2"
                endColor="heds.bg3"
                isLoaded={!isLoading}
                rounded="lg"
                bg="heds.bg3"
                as={Box}
                fitContent
                height="full"
                width="full"
                mt={'0 !important'}
                p={1}
              >
                <SongEvent key={event.event_timestamp + event.id} {...event} />
              </Skeleton>
            ))}
            {Array.from(Array(handleEventEmptyStates()).keys()).map((i) => (
              <Skeleton
                startColor="heds.bg2"
                endColor="heds.bg3"
                isLoaded={!isLoading}
                rounded="lg"
                key={i + 'attribute'}
                as={Box}
                fitContent
                height="full"
                width="full"
                mt={'0 !important'}
              >
                <Flex opacity={'30%'} rounded="lg" bg="heds.bg2" p={2.5} alignItems="center" gap={5}>
                  <Box opacity={'0%'} shadow={'lg'} rounded={'lg'} w={{ base: '10', lg: '12' }} h={{ base: '10', lg: '12' }} />
                  <Stack justifyContent={'center'}>
                    <Flex alignItems={'baseline'} gap={1.5}></Flex>
                  </Stack>
                  <Text ml={'auto'} mr={{ base: 1, lg: 2 }} mt={'0 !important'} fontFamily="inter" fontSize="2xs" color={'white'} opacity={'60%'}></Text>
                </Flex>
              </Skeleton>
            ))}
          </Stack>
        </Stack>
      </GridItem>
      <GridItem my={5} colSpan={1}>
        <Stack>
          <Text textTransform={'uppercase'} fontFamily={'karla'} fontWeight="medium" letterSpacing={'wide'} color="white" opacity={'50%'} fontSize="sm">
            ATTRIBUTES
          </Text>
          <Grid templateRows={{ base: 'repeat(4, 1fr)', lg: 'repeat(8, 1fr)' }} templateColumns="repeat(4, 1fr)" gap={2}>
            <Skeleton
              startColor="heds.bg2"
              endColor="heds.bg3"
              rounded="lg"
              width="full"
              key={songHash + 'key'}
              rowSpan={1}
              colSpan={2}
              as={GridItem}
              fitContent
              isLoaded={!isLoading}
            >
              <Attribute name={'KEY'} description={formatCyaniteKeys(cyaniteData?.keyPrediction?.value)} />
            </Skeleton>
            <Skeleton
              startColor="heds.bg2"
              endColor="heds.bg3"
              rounded="lg"
              width="full"
              key={songHash + 'time'}
              rowSpan={1}
              colSpan={2}
              as={GridItem}
              fitContent
              isLoaded={!isLoading}
            >
              <Attribute name={'TIME SIGNATURE'} description={cyaniteData?.timeSignature} />
            </Skeleton>
            {cyaniteData?.genreTags?.map((genre: string, i: number) => (
              <Skeleton
                startColor="heds.bg2"
                endColor="heds.bg3"
                rounded="lg"
                width="full"
                key={'details' + genre + i}
                rowSpan={1}
                colSpan={2}
                as={GridItem}
                fitContent
                isLoaded={!isLoading}
              >
                <Attribute name={'GENRE'} description={formatCyaniteGenres(genre)} />
              </Skeleton>
            ))}
            {cyaniteData?.subgenreTags?.map((subgenre: string, i: number) => (
              <Skeleton
                startColor="heds.bg2"
                endColor="heds.bg3"
                rounded="lg"
                width="full"
                key={'details' + subgenre + i}
                rowSpan={1}
                colSpan={2}
                as={GridItem}
                fitContent
                isLoaded={!isLoading}
              >
                <Attribute name={'SUBGENRE'} description={formatCyaniteSubGenres(subgenre)} />
              </Skeleton>
            ))}
            {handleAttributeEmptyStates() > 0 &&
              new Array(handleAttributeEmptyStates()).fill(0).map((_, index) => (
                <Skeleton
                  startColor="heds.bg2"
                  endColor="heds.bg3"
                  rounded="lg"
                  width="full"
                  key={'details' + index}
                  rowSpan={1}
                  colSpan={2}
                  as={GridItem}
                  fitContent
                  isLoaded={!isLoading}
                >
                  <Box minH="full" as={Stack} alignItems="center" px={6} rounded="lg" opacity={'30%'} bg="heds.bg2"></Box>
                </Skeleton>
              ))}
          </Grid>
        </Stack>
      </GridItem>
      <GridItem my={5} colSpan={1}>
        <Stack>
          <Text textTransform={'uppercase'} fontFamily={'karla'} fontWeight="medium" letterSpacing={'wide'} color="white" opacity={'50%'} fontSize="sm">
            Mood Spectrogram
          </Text>
          {cyaniteData?.mood && <RadialChart data={cyaniteData.mood} />}
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};
