import { useSelector } from 'react-redux';
import { Box, Flex, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { store } from '@/store';
import RadialChart from '@/common/charts/RadialChart/RadialChart';
import SongEvent from '@/common/events/SongEvent';

export const Details = () => {
  const cyaniteData = useSelector(store.select.songModel.selectCyaniteData);
  const songEvents = useSelector(store.select.songModel.selectSongEvents);
  return (
    <SimpleGrid py={5} columns={{ base: 1, lg: 3 }}>
      <GridItem pt={6} pb={{ base: 10, lg: 0 }} pr={{ lg: 20 }} colSpan={1}>
        <Stack minH={{ lg: '80%' }} p={2} justifyContent={'start'} rounded="lg" bg="heds.bg6">
          {songEvents?.map((event) => (
            <SongEvent key={event.event_timestamp + event.id} {...event} />
          ))}
        </Stack>
      </GridItem>
      <GridItem colSpan={1}>
        <Stack mx="auto" h="full" justifyContent={'center'} gap={1}>
          <Box py={1} as={Stack} alignItems="center" px={6} rounded="lg" bg="heds.700">
            <Text mt={'0 !important'} fontFamily="inter" fontWeight="light" color="white" fontSize="2xs">
              KEY
            </Text>
            <Text mt={'0 !important'} fontFamily="inter" fontWeight="bold" color="white" fontSize="xs">
              {cyaniteData?.keyPrediction?.value}
            </Text>
          </Box>
          <Box py={1} as={Stack} alignItems="center" px={6} rounded="lg" bg="heds.700">
            <Text mt={'0 !important'} fontFamily="inter" fontWeight="light" color="white" fontSize="2xs">
              TIME SIGNATURE
            </Text>
            <Text mt={'0 !important'} fontFamily="inter" fontWeight="bold" color="white" fontSize="xs">
              {cyaniteData?.timeSignature}
            </Text>
          </Box>
          <Box py={1} as={Stack} alignItems="center" px={6} rounded="lg" bg="heds.700">
            <Text mt={'0 !important'} fontFamily="inter" fontWeight="light" color="white" fontSize="2xs">
              SUBGENRES
            </Text>
            <Flex mt={'0 !important'}>
              {cyaniteData?.subgenreTags?.map((subgenre) => (
                <Text key={subgenre} mt={'0 !important'} fontFamily="inter" fontWeight="bold" color="white" fontSize="xs">
                  {subgenre}
                </Text>
              ))}
            </Flex>
          </Box>
        </Stack>
      </GridItem>
      <GridItem mr={-10} colSpan={1}>
        {cyaniteData?.mood && <RadialChart data={cyaniteData.mood} />}
      </GridItem>
    </SimpleGrid>
  );
};
