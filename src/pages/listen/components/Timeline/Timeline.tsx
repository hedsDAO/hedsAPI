import { RootState } from '@/store';
import { classNames } from '@/utils';
import { BoltIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { CheckIcon, EyeIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { TimelineDescriptions, TimelineNames, TimelineStatus } from '@/pages/listen/store/hedstapeModel';
import { Box, Button, Divider, Flex, IconButton, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { IconClock, IconDownload, IconLine } from '@tabler/icons';

const Timeline = () => {
  const { currentTape } = useSelector((state: RootState) => state.tapesModel);
  const { timeline } = useSelector((state: RootState) => state.hedstapeModel);
  const names = new TimelineNames();
  const desc = new TimelineDescriptions();
  return (
    <Fragment>
      {currentTape && (
        <div className="bg-white py-6">
          <div className="mx-auto max-w-xl lg:max-w-7xl px-5 lgpx-10">
            <dl className="space-y-10 lg:grid lg:grid-cols-3 lg:gap-20 lg:space-y-0">
              {/* Submit */}
              <div>
                <dt>
                  <Flex alignItems={'baseline'} gap={2.5} mb={2}>
                    <i className="fa-sharp fa-solid fa-arrow-up-from-bracket" />
                    <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{names.submit}</Text>
                  </Flex>
                  <Flex my={3} alignItems={'stretch'} gap={2}>
                    <IconButton bg="green.200" shadow={'sm'} aria-label="submit" icon={<CheckIcon height="16" width="16" />} />
                    <Box w="fit-content" rounded="md" shadow={'sm'} bg="green.50" border={'1px'} borderColor={'green.100'} px={4}>
                      <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
                        <Text fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.submit.start, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text>
                        <Text className="relative bottom-[0.1rem]">-</Text>
                        <Text fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.submit.end, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </dt>
                <dd className="mt-2 text-sm tracking-tight text-gray-500">{desc.submit}</dd>
                <Flex mt={4} gap={2}>
                  <Button border={'solid 1px'} borderColor="blue.100" bg="blue.50" leftIcon={<IconDownload height="14" width="14" />} size={'sm'} pr={3}>
                    Download
                  </Button>
                  <Button disabled leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
                    Submit
                  </Button>
                </Flex>
              </div>
              {/* Vote */}
              <div>
                <dt>
                  <Flex alignItems={'baseline'} gap={2.5} mb={2}>
                    <i className="fa-sharp fa-solid fa-xmark-to-slot"></i>
                    <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{names.vote}</Text>
                  </Flex>
                  <Flex my={3} alignItems={'stretch'} gap={2}>
                    <IconButton bg="green.200" shadow={'sm'} aria-label="vote" icon={<CheckIcon height="16" width="16" />} />
                    <Box w="fit-content" rounded="md" shadow={'sm'} bg="green.50" border={'1px'} borderColor={'green.100'} px={4}>
                      <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
                        <Text fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.vote.start, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text>
                        <Text className="relative bottom-[0.1rem]">-</Text>
                        <Text fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.vote.end, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </dt>
                <dd className="mt-2 text-sm tracking-tight text-gray-500">{desc.vote}</dd>
                <Flex mt={4} gap={2}>
                  <Button border={'solid 1px'} borderColor="blue.100" bg="blue.50" leftIcon={<EyeIcon height="14" width="14" />} size={'sm'} pr={3}>
                    View Results
                  </Button>
                  <Button disabled leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
                    Submit
                  </Button>
                </Flex>
              </div>
              {/* Mint */}
              <div>
                <dt>
                  <Flex alignItems={'baseline'} gap={2.5} mb={2}>
                    <i className="fa-sharp fa-solid fa-album-collection"></i>
                    <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{names.mint}</Text>
                  </Flex>
                  <Flex my={3} alignItems={'stretch'} gap={2}>
                    <IconButton bg="green.200" shadow={'sm'} aria-label="mint" icon={<CheckIcon height="16" width="16" />} />
                    <Box w="fit-content" rounded="md" shadow={'sm'} bg="green.50" border={'1px'} borderColor={'green.100'} px={4}>
                      <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
                        <Text fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.mint.start, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text>
                        <Text className="relative bottom-[0.1rem]">-</Text>
                        <Text fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.mint.end, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </dt>
                <dd className="mt-2 text-sm tracking-tight text-gray-500">{desc.mint}</dd>
                <Flex mt={4} gap={2}>
                  <Button border={'solid 1px'} borderColor="blue.100" bg="blue.50" leftIcon={<i className="fak fa-opensea text-xs" />} size={'sm'} pr={3}>
                    OpenSea
                  </Button>
                  <Button disabled leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
                    Mint
                  </Button>
                </Flex>
              </div>
            </dl>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Timeline;
