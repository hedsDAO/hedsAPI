import { Dispatch, RootState } from '@/store';
import { classNames } from '@/utils';
import { BoltIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { CheckIcon, EyeIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimelineDescriptions, TimelineNames, TimelineStatus } from '@/pages/listen/store/hedstapeModel';
import { Badge, Box, Button, Divider, Flex, IconButton, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { IconClock, IconDownload, IconHourglassLow, IconLine } from '@tabler/icons';
import DateCountdown from '@/common/countdown/DateCountdown';
import { Modals } from '@/modules/modals/store/modalModel';

const Timeline = () => {
  const dispatch = useDispatch<Dispatch>();
  const { currentTape } = useSelector((state: RootState) => state.tapesModel);
  const { timeline } = useSelector((state: RootState) => state.hedstapeModel);
  const names = new TimelineNames();
  const desc = new TimelineDescriptions();
  return (
    <Fragment>
      {currentTape && (
        <div className="bg-white py-6">
          <div className="mx-auto max-w-xl lg:max-w-7xl px-10 lg:px-10">
            <dl className="space-y-10 lg:grid lg:grid-cols-3 lg:gap-20 lg:space-y-0">
              {/* Submit */}
              <div>
                <Flex alignItems={'center'} gap={2.5} mb={2}>
                  {/* <i className="fa-sharp fa-solid fa-arrow-up-from-bracket" /> */}
                  <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{names.submit}</Text>
                  <Badge variant={'outline'} fontSize="xs">
                    closed
                  </Badge>
                </Flex>
                <dd className="mt-2 text-sm tracking-tight text-gray-500">{desc.submit}</dd>
                <dt>
                  <Flex my={3} alignItems={'stretch'} gap={2}>
                    <IconButton
                      pointerEvents={'none'}
                      _hover={{ background: 'gray.100' }}
                      border={'solid 1px'}
                      borderColor={'gray.200'}
                      bg="gray.100"
                      shadow={'sm'}
                      aria-label="submit"
                      icon={<CheckIcon height="16" width="16" />}
                    />
                    <Box w="fit-content" rounded="md" shadow={'sm'} bg="gray.100" border={'1px'} borderColor={'gray.200'} px={4}>
                      <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
                        <Text textColor={'gray.600'} fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.submit.start, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text>
                        <Text textColor={'gray.600'} className="relative bottom-[0.1rem]">
                          -
                        </Text>
                        <Text textColor={'gray.600'} fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
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
                <Flex mt={4} gap={2}>
                  <Button
                    onClick={() => {
                      dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
                      dispatch.modalModel.setModalOpen(true);
                    }}
                    border={'solid 1px'}
                    borderColor="blue.100"
                    bg="blue.50"
                    leftIcon={<IconDownload height="14" width="14" />}
                    size={'sm'}
                    pr={3}
                  >
                    Download
                  </Button>
                  <Button disabled leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
                    Submissions Closed
                  </Button>
                </Flex>
              </div>
              {/* Vote */}
              <div>
                <Flex alignItems={'center'} gap={2.5} mb={2}>
                  {/* <i className="fa-sharp fa-solid fa-xmark-to-slot"></i> */}
                  <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{names.vote}</Text>
                  <Badge colorScheme={'green'} variant={'outline'} fontSize="xs">
                    open
                  </Badge>
                </Flex>
                <dd className="mt-2 text-sm tracking-tight text-gray-500">{desc.vote}</dd>
                <dt>
                  <Flex my={3} alignItems={'stretch'} gap={2}>
                    <IconButton
                      className="animate-pulse"
                      pointerEvents={'none'}
                      _hover={{ background: 'green.200' }}
                      border={'solid 1px'}
                      borderColor="green.100"
                      bg="green.200"
                      shadow={'sm'}
                      aria-label="vote"
                      icon={<IconHourglassLow height="16" width="16" />}
                    />
                    <Box w="fit-content" rounded="md" shadow={'sm'} bg="green.50" border={'1px'} borderColor={'green.100'} px={4}>
                      <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
                        <DateCountdown deadline={currentTape?.timeline?.vote.end + 5000000000} />
                      </Flex>
                    </Box>
                  </Flex>
                </dt>
                <Flex mt={4} gap={2}>
                  <Button
                    border={'solid 1px'}
                    borderColor="green.200"
                    bg="green.100"
                    leftIcon={<i className="fa-sharp fa-solid fa-xmark-to-slot"></i>}
                    size={'sm'}
                    pr={3}
                  >
                    Vote
                  </Button>
                  {/* <Button disabled leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
                    Vote Closed
                  </Button> */}
                </Flex>
              </div>
              {/* Mint */}
              <div>
                <Flex alignItems={'center'} gap={2.5} mb={2}>
                  {/* <i className="fa-sharp fa-solid fa-album-collection"></i> */}
                  <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{names.mint}</Text>
                  <Badge colorScheme={'orange'} variant={'outline'} fontSize="xs">
                    upcoming
                  </Badge>
                </Flex>
                <dd className="mt-2 text-sm tracking-tight text-gray-500">{desc.mint}</dd>
                <dt>
                  <Flex my={3} alignItems={'stretch'} gap={2}>
                    <IconButton
                      disabled
                      bg="gray.300"
                      shadow={'sm'}
                      aria-label="mint"
                      icon={<LockClosedIcon className="text-gray-400" height="16" width="16" />}
                    />
                    <Box w="fit-content" rounded="md" shadow={'sm'} bg="gray.50" border={'1px'} borderColor={'gray.100'} px={4}>
                      <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
                        <Text textColor={'gray.400'} fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.mint.start, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZoneName: 'short',
                          })}
                        </Text>
                        {/* <Text className="text-gray-400 relative bottom-[0.1rem]">-</Text>
                        <Text textColor={'gray.400'} fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
                          {DateTime.fromMillis(currentTape?.timeline?.mint.end, { zone: 'GMT' }).toLocaleString({
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text> */}
                      </Flex>
                    </Box>
                  </Flex>
                </dt>
                {/* <Flex mt={4} gap={2}>
                  <Button border={'solid 1px'} borderColor="blue.100" bg="blue.50" leftIcon={<i className="fak fa-opensea text-xs" />} size={'sm'} pr={3}>
                    OpenSea
                  </Button>
                  <Button
                      onClick={() => {
                      dispatch.modalModel.setModal(Modals.MINT_MODAL);
                      dispatch.modalModel.setModalOpen(true);
                    }} disabled leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
                    Mint Closed
                  </Button>
                </Flex> */}
              </div>
            </dl>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Timeline;
