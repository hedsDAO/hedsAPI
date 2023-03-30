import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Flex, Grid, GridItem, Image, Stack, Text, Tooltip } from '@chakra-ui/react';
import { User as UserComponent } from '@/common';
import { Tape, User } from '@/models/common';
import { mockSong } from '../models/constant';
import { formatDuration } from '@/utils';
import { RadialChart } from '@/common';

const SongDetails = ({ cyanite, curator, tape }: { cyanite?: { [key: string]: any }; curator: User; tape: Tape }) => {
  console.log(cyanite, 'data');

  return (
    <Grid px={9} rounded="sm" templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(12, 1fr)' }}>
      <GridItem colSpan={3}>
        <Stack>
          <Text letterSpacing={'widest'} fontSize={'sm'} fontWeight="semibold" color={'blackAlpha.700'}>
            {`ARTIST(S)`}
          </Text>
          <UserComponent user={curator} />
          {/* <Text pt={6} letterSpacing={'widest'} fontSize={'sm'} fontWeight="semibold" color={'blackAlpha.700'}>
            {`SONG DETAILS`}
          </Text> */}
          <Stack>
            <Flex mt={'1 !important'} gap={2} alignItems={'baseline'}>
              <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
                RELEASE DATE:
              </Text>
              <Text letterSpacing={'widest'} fontSize={'xs'}>
                2/3/2023
              </Text>
            </Flex>
            <Flex mt={'1 !important'} gap={2} alignItems={'baseline'}>
              <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
                DURATION:
              </Text>
              <Text fontSize={'xs'} letterSpacing="widest">
                {formatDuration(mockSong.duration)}
              </Text>
            </Flex>
            <Flex mt={'1 !important'} gap={2} alignItems={'baseline'}>
              <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
                SUBMITTED TO:
              </Text>
              <Text letterSpacing={'widest'} fontSize={'xs'}>
                hedsTAPE 11
              </Text>
            </Flex>
            <Flex mt={'1 !important'} gap={2} alignItems={'baseline'}>
              <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
                SUBMISSION NAME:
              </Text>
              <Text letterSpacing={'widest'} fontSize={'xs'}>
                {mockSong?.track_name || JSON.parse(mockSong?.submission_data)?.sub_id}
              </Text>
            </Flex>
            <Flex mt={'0 !important'} gap={2} alignItems={'center'}>
              <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
                SUBMISSION IMAGE:
              </Text>
              <Avatar size="xs" src={JSON.parse(mockSong?.submission_data)?.sub_image} />
            </Flex>
          </Stack>
          <Flex color="blackAlpha.900" pt={1} gap={3} alignItems={'center'}>
            <Text color="blackAlpha.800" letterSpacing={'widest'} fontSize="xs" textTransform={'uppercase'}>
              view vote results
            </Text>
            <i className="fa-solid fa-arrow-right"></i>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem colSpan={4}>
        <Stack alignItems={'center'}>
          <Text ml={'-3'} letterSpacing={'widest'} fontSize={'2xs'} fontWeight="semibold" color={'blackAlpha.600'}>
            {`EMOTIONAL SPECTROGRAM`}
          </Text>
          {cyanite?.mood && <RadialChart data={cyanite?.mood} />}
        </Stack>
      </GridItem>
      <GridItem colStart={9} colSpan={4}>
        <Stack justifyContent="center">
          <Flex alignItems={'baseline'} gap={2}>
            <Text letterSpacing={'widest'} fontSize={'sm'} fontWeight="semibold" color={'blackAlpha.700'}>
              {`AI`}
            </Text>
            <Tooltip label="AI song analysis is currently a beta feature to help improve cataloging music on heds.">
              <Text color="blackAlpha.700" fontSize="sm">
                <i className="fa-regular fa-question-circle"></i>
              </Text>
            </Tooltip>
          </Flex>
          <Flex mt={'3 !important'} gap={2} alignItems={'baseline'}>
            <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
              {`BPM:`}
            </Text>
            <Text letterSpacing={'tight'} fontSize={'xs'}>
              {cyanite?.bpmRangeAdjusted}
            </Text>
          </Flex>
          <Flex mt={'1 !important'} gap={2} alignItems={'baseline'}>
            <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
              {`KEY:`}
            </Text>
            <Text letterSpacing={'tight'} fontSize={'xs'}>
              {`${cyanite?.keyPrediction?.value?.split('M')[0]} ${cyanite?.keyPrediction?.value?.split(cyanite?.keyPrediction?.value?.split('M')[0])[1]}`}
            </Text>
            <Text letterSpacing={'tight'} fontSize={'xs'} color="blackAlpha.700">
              {`(${cyanite?.keyPrediction?.confidence?.toFixed(2) * 100}% confidence)`}
            </Text>
          </Flex>
          <Flex pt={2} gap={2}>
            <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
              {`MOOD(S):`}
            </Text>
            {cyanite?.moodAdvancedTags.map((mood: any, index: number) => {
              return <Text letterSpacing={'tight'} key={mood} fontSize="xs">{`${mood}${index == cyanite.moodAdvancedTags.length - 1 ? '' : ','} `}</Text>;
            })}
          </Flex>
          <Flex mt={'1 !important'} gap={2}>
            <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
              {`GENRE(S):`}
            </Text>
            {cyanite?.genreTags.map((genre: any, index: number) => {
              return (
                <Text letterSpacing={'tight'} key={genre} fontSize="xs">
                  {genre}
                </Text>
              );
            })}
          </Flex>
          <Flex mt={'1 !important'} gap={2}>
            <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
              {`SUB-GENRE(S):`}
            </Text>
            {cyanite?.subgenreTags.map((genre: any, index: number) => {
              return (
                <Text letterSpacing={'tight'} key={genre} fontSize="xs">
                  {genre}
                </Text>
              );
            })}
          </Flex>
          <Flex mt={'1 !important'} gap={2} alignItems={'baseline'}>
            <Text letterSpacing={'tight'} fontSize={'xs'} fontWeight="medium" color={'blackAlpha.500'}>
              {`DESCRIPTION:`}
            </Text>
            <Text letterSpacing={'tight'} fontSize={'xs'}>
              {`${cyanite?.transformerCaption}`}
            </Text>
          </Flex>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default SongDetails;
