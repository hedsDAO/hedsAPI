import { Dispatch, RootState } from '@/store';
import { Flex, Stack, StackDivider, Avatar, Text, Box, IconButton } from '@chakra-ui/react';
import { Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';

const DesktopQueue = () => {
  const dispatch = useDispatch<Dispatch>();
  const audioData = useSelector((state: RootState) => state.audioModel);
  console.log(audioData)
  return (
    <Transition
      className={'relative -z-10'}
      show={audioData.isShowingQueue}
      enter="transition-all duration-500"
      enterFrom="opacity-0 translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all duration-500"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-full"
    >
      <Box className="relative h-full w-screen bg-gray-200 px-[10%]">
        <Text mb={2} px={2} fontSize={'lg'} fontWeight={'bold'}>
          Up Next
        </Text>
        {audioData?.queue?.length &&
          audioData?.queue.map((queueItem, i) => {
            return (
              <Flex key={i}>
                <Stack  divider={<StackDivider />} fontSize="sm" px="2" py={3} spacing="0.5">
                  <Flex alignItems="center">
                    <Avatar size="sm" />
                    <Flex direction="column">
                      <Flex direction="column">
                        <Text fontWeight="medium" color="emphasized">
                            {queueItem?.track}
                        </Text>
                      </Flex>
                      <Text color="subtle">{queueItem?.artist}</Text>
                    </Flex>
                  </Flex>
                </Stack>
                <IconButton
                        onClick={() => {
                          console.log('here');
                          dispatch.audioModel.removeTrackFromQueue(queueItem)
                        }
                        }
                        disabled={false}
                        aria-label="remove"
                        icon={<i className="fa-solid fa-layer-group"></i>}
                        className="hover:scale-125"
                        _hover={{ bg: 'gray.200' }}
                      />
              </Flex>
            );
          })}
      </Box>
    </Transition>
  );
};

export default DesktopQueue;
