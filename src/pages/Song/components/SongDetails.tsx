import { Box, Divider, Flex, GridItem, SimpleGrid, Stack, Text, Button, IconButton, Image, Center, SkeletonText, Avatar } from '@chakra-ui/react';
import { InfoPair, User as UserComponent } from '@/common';
import { Tape, User } from '@/models/common';
import { mockArtist, mockSong } from '../models/constant';
import { formatDuration } from '@/utils';
import { RadialChart } from '@/common';
import { mockTape } from '@/pages/Tape/models/constant';

const colors = [
  '#FF0000', // Red
  '#FF5500', // Orange-Red
  '#FFAA00', // Orange
  '#FFD700', // Gold
  '#FFFF00', // Yellow
  '#AFFF00', // Yellow-Green
  '#00FF00', // Green
  '#00FFAA', // Green-Cyan
  '#00FFFF', // Cyan
  '#007FFF', // Sky Blue
  '#0000FF', // Blue
  '#7F00FF', // Blue-Violet
  '#AA00FF', // Purple
];

const SongDetails = ({ cyanite, curator, tape }: { cyanite?: { [key: string]: any }; curator: User; tape: Tape }) => {
  const arrOfMoods = cyanite?.moodAdvancedTags.map((mood: any, index: number) => `${mood}${index == cyanite.moodAdvancedTags.length - 1 ? '' : ','} `);
  const bpmAndConfidence = `${cyanite?.keyPrediction?.value?.split('M')[0]} ${
    cyanite?.keyPrediction?.value?.split(cyanite?.keyPrediction?.value?.split('M')[0])[1]
  } (${cyanite?.keyPrediction?.confidence?.toFixed(2) * 100}% confidence)`;
  console.log(cyanite);
  return (
    <Box>
      <Divider />
      <SimpleGrid gap={{ base: 0, xl: 8 }} columns={{ base: 1, xl: 12 }}>
        <GridItem px={{ base: 6, xl: 8 }} py={{ base: 6, xl: 8 }} as={Stack} justifyContent={'start'} colSpan={2}>
          <UserComponent user={curator} />
          <Box py={2} />
          <InfoPair inline label="duration" value={formatDuration(mockSong.duration)} />
          <InfoPair inline label="release date" value="Feb. 3, 2023" />
          <InfoPair inline label="submission" value="hedsTAPE 11" />
          <Box py={1} />
          <Flex alignItems={'center'} gap={2} pb={7}>
            <Button rounded="sm" size="xs" bg="blackAlpha.900" color="white" variant="solid">
              <i className="fa-kit fa-sound"></i>
            </Button>
            <Button rounded="sm" size="xs" leftIcon={<i className="fa-brands fa-twitter"></i>} bg="blue.400" color="white" variant="solid">
              SHARE
            </Button>
            <IconButton aria-label="more" rounded="sm" size="sm" icon={<i className="fa-solid fa-ellipsis" />} bg="transparent" color="black" variant="solid" />
          </Flex>
          {/* <Flex gap={1} alignItems={'center'}>
            <Avatar size="sm" src={JSON.parse(mockSong?.submission_data)?.sub_image} />
            <Text fontSize={'xs'}>{JSON.parse(mockSong.submission_data)?.sub_id}</Text>
          </Flex>
          <Button gap={2} rounded="sm" size="xs" bg="gray.700" color="white" variant="solid">
            VIEW VOTE <i className="fa-solid fa-arrow-right"></i>
          </Button> */}
        </GridItem>
        <GridItem px={{ base: 4, xl: 8 }} py={{ base: 6, xl: 8 }} as={Stack} gap={0} colSpan={5}>
          <Text
            px={2}
            as={Flex}
            gap={1.5}
            mb={3}
            alignItems="center"
            fontWeight={'medium'}
            fontFamily="inter"
            fontSize="sm"
            letterSpacing={'widest'}
            color="blackAlpha.800"
          >
            {/* <i style={{fontSize: '0.6rem'}} className="fa-solid fa-clock"></i>  */}
            HISTORY
          </Text>
          <Box mt={'0 !important'}>
            <Flex p={2} alignItems="center" gap={4}>
              <Center rounded="lg" bg="gray.700">
                <Image opacity={'0%'} shadow={'lg'} rounded={'lg'} src={mockSong.cover} w={{ base: '10', lg: '12' }} h={{ base: '10', lg: '12' }} />
                <Box opacity={'100%'} color={'white'} position={'absolute'} zIndex="20" w={{ base: '19px', lg: '20px' }}>
                  <i className="fa-solid fa-waveform-lines"></i>
                </Box>
              </Center>
              <Stack justifyContent={'center'}>
                <Flex alignItems={'baseline'} gap={1.5}>
                  <Text fontFamily="inter" fontSize={{ base: 'xs', lg: 'sm' }} letterSpacing={'widest'}>
                    {mockArtist.display_name}
                  </Text>
                  <Text fontFamily="inter" fontSize={{ base: '2xs', lg: 'xs' }} letterSpacing={'widest'} color={'blackAlpha.500'}>
                    submitted to the tape
                  </Text>
                </Flex>
                <Text mt={'0 !important'} fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'blackAlpha.600'}>
                  {mockTape.name}
                </Text>
              </Stack>
              <Text ml={'auto'} mr={{ base: 1, lg: 2 }} mt={'0 !important'} fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'blackAlpha.600'}>
                1 month ago
              </Text>
            </Flex>
          </Box>
          <Box mt={'0 !important'}>
            <Flex p={2} alignItems="center" gap={4}>
              <Center rounded="lg" bg="gray.700">
                <Image opacity={'0%'} shadow={'lg'} rounded={'lg'} src={mockSong.cover} w={{ base: '10', lg: '12' }} h={{ base: '10', lg: '12' }} />
                <Box opacity={'100%'} color={'white'} position={'absolute'} zIndex="20" w={{ base: '15px', lg: '16px' }}>
                  <i className="fa-solid fa-party-horn"></i>
                </Box>
              </Center>
              <Stack justifyContent={'center'}>
                <Flex alignItems={'baseline'} gap={1.5}>
                  <Text fontFamily="inter" fontSize={{ base: 'xs', lg: 'sm' }} letterSpacing={'widest'}>
                    {mockArtist.display_name}
                  </Text>
                  <Text fontFamily="inter" fontSize={{ base: '2xs', lg: 'xs' }} letterSpacing={'widest'} color={'blackAlpha.500'}>
                    made it on the tape.
                  </Text>
                </Flex>
                <Text mt={'0 !important'} fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'blackAlpha.600'}>
                  {mockTape.name}
                </Text>
              </Stack>
              <Text ml={'auto'} mr={{ base: 1, lg: 2 }} mt={'0 !important'} fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'blackAlpha.600'}>
                2 weeks ago
              </Text>
            </Flex>
          </Box>
          <Box mt={'0 !important'}>
            <Flex p={2} alignItems="center" gap={4}>
              <Center rounded="lg" bg="gray.200">
                <Image opacity={'0%'} shadow={'lg'} rounded={'lg'} src={mockSong.cover} w={{ base: '10', lg: '12' }} h={{ base: '10', lg: '12' }} />
              </Center>
              <Stack justifyContent={'center'}>
                <SkeletonText noOfLines={2}>
                  <Text minW="10ch"></Text>
                </SkeletonText>
              </Stack>
              <SkeletonText noOfLines={1} ml={'auto'} mr={{ base: 1, lg: 2 }}>
                <Text minW="6ch"></Text>
                <Text mt={'0 !important'} fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'blackAlpha.600'}></Text>
              </SkeletonText>
            </Flex>
          </Box>
          <Box mt={'0 !important'}>
            <Flex p={2} alignItems="center" gap={4}>
              <Center rounded="lg" bg="gray.200">
                <Image opacity={'0%'} shadow={'lg'} rounded={'lg'} src={mockSong.cover} w={{ base: '10', lg: '12' }} h={{ base: '10', lg: '12' }} />
              </Center>
              <Stack justifyContent={'center'}>
                <SkeletonText noOfLines={2}>
                  <Text minW="10ch"></Text>
                </SkeletonText>
              </Stack>
              <SkeletonText noOfLines={1} ml={'auto'} mr={{ base: 1, lg: 2 }}>
                <Text minW="6ch"></Text>
                <Text mt={'0 !important'} fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'blackAlpha.600'}></Text>
              </SkeletonText>
            </Flex>
          </Box>
        </GridItem>
        <GridItem alignItems={'start'} px={{ base: 4, xl: 8 }} py={{ base: 6, xl: 8 }} as={Stack} gap={0} colSpan={5}>
          <Text
            px={2}
            as={Flex}
            gap={1.5}
            mb={3}
            alignItems="center"
            fontWeight={'medium'}
            fontFamily="inter"
            fontSize="sm"
            letterSpacing={'widest'}
            color="blackAlpha.800"
          >
            INSIGHTS
          </Text>
          <SimpleGrid columns={{ base: 3, xl: 5 }} gap={2} px={2} pb={3}>
            <GridItem minW="full" colSpan={1}>
              <Center p={1} minW={{ base: '10', lg: '12' }} w={'full'} h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
                <Stack alignItems={'center'}>
                  <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                    BPM
                  </Text>
                  <Flex alignItems={'baseline'} mt={'0 !important'}>
                    <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                      {cyanite?.bpmPrediction?.value}
                    </Text>
                    <Text ml={1} fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                      {cyanite?.bpmPrediction?.confidence?.toFixed(2) * 100}%
                    </Text>
                  </Flex>
                </Stack>
              </Center>
            </GridItem>
            <GridItem minW="full" colSpan={1}>
              <Center p={2} w="full" h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
                <Stack alignItems={'center'}>
                  <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                    GENRE
                  </Text>
                  <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                    {cyanite?.genreTags[0]}
                  </Text>
                </Stack>
              </Center>
            </GridItem>
            <GridItem minW="full" colSpan={1}>
              <Center p={2} w="full" h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
                <Stack alignItems={'center'}>
                  <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                    SUBGENRE
                  </Text>
                  <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                    {cyanite?.subgenreTags[0]}
                  </Text>
                </Stack>
              </Center>
            </GridItem>
            <GridItem minW="full" colSpan={1}>
              <Center p={2} w="full" h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
                <Stack alignItems={'center'}>
                  <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                    KEY
                  </Text>
                  <Flex alignItems={'baseline'} mt={'0 !important'}>
                    <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                      {cyanite?.keyPrediction?.value}
                    </Text>
                    <Text ml={1} fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                      {cyanite?.keyPrediction?.confidence?.toFixed(2) * 100}%
                    </Text>
                  </Flex>
                </Stack>
              </Center>
            </GridItem>
            <GridItem minW="full" colSpan={1}>
              <Center p={2} w="full" h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
                <Stack alignItems={'center'}>
                  <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                    TIME SIGNATURE
                  </Text>
                  <Flex alignItems={'baseline'} mt={'0 !important'}>
                    <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                      {cyanite?.timeSignature}
                    </Text>
                  </Flex>
                </Stack>
              </Center>
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, xl: 3 }} w="full" alignItems={{ base: 'center', xl: 'start' }} gap={5} px={2} pt={5}>
            <GridItem colSpan={{ base: 1, xl: 3 }}>
              <Text fontFamily={'inter'} fontWeight="light" color={'gray.600'} letterSpacing="widest" fontSize="xs">
                MOOD SPECTROGRAM
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Stack>
                {/* {cyanite?.mood &&
                  Object.entries(cyanite.mood).map(([mood, value], index) => {
                    return (
                      <Flex
                        w="full"
                        mt="0.5 !important"
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        px={1.5}
                        py={0.5}
                        rounded="sm"
                        bg="blackAlpha.800"
                      >
                        <Text fontWeight={'light'} color={colors[index]} mt={'-0.5 !important'} fontSize="xs">
                          {mood}
                        </Text>
                        <Text color="white" mt={'-0.5 !important'} fontSize="xs">
                          {typeof value === 'number' && value?.toFixed(2)}
                        </Text>
                      </Flex>
                    );
                  })} */}
              </Stack>
            </GridItem>
            <GridItem colSpan={{ base: 1, xl: 2 }}>{cyanite?.mood && <RadialChart data={cyanite?.mood} />}</GridItem>
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
      <Divider mb={5} />
    </Box>
  );
};

export default SongDetails;
