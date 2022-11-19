import { store } from '@/store';
import { formatTime } from '@/utils';
import { Flex, Avatar, Text } from '@chakra-ui/react';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const QueueContainer = () => {
  const queue = useSelector(store.select.audioModel.selectQueue);
  const isShowingQueue = useSelector(store.select.audioModel.selectIsShowingQueue);
  const isQueueEmpty = useSelector(store.select.audioModel.selectIsQueueEmpty);
  return (
    <Fragment>
      <Transition
        className={'absolute z-0 h-screen'}
        show={isShowingQueue}
        enter="ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`fixed z-0 inset-0 bg-black bg-opacity-75 h-screen`} />
      </Transition>
      <Transition
        className={'relative z-20'}
        show={isShowingQueue}
        enter="transition-all duration-500"
        enterFrom="transition-all translate-y-full "
        enterTo="transition-all translate-y-0"
        leave="transition-all duration-500"
        leaveFrom="transition-all translate-y-0"
        leaveTo="transition-all translate-y-full"
      >
        <Flex
          direction="column"
          className="relative z-20 rounded-t-lg border-t sm:border-t sm:border-r sm:border-x-0 border-x sm:rounded-t-none sm:rounded-tr-lg h-full mx-auto sm:mx-0 w-[95%] sm:w-[75%] md:w-[50%] lg:w-[30%] xl:w-[25%] sm:mr-auto  border-neutral-900 bg-white px-4 pt-4 pb-6 gap-1"
        >
          {!isQueueEmpty && (
            <Text mb={2} px={2} fontSize={'lg'} fontWeight={'bold'}>
              Up Next
            </Text>
          )}
          {!isQueueEmpty &&
            queue.map((queueItem, i) => {
              return (
                <Flex key={i} w="full" alignItems={'center'}>
                  <Text fontSize={'xs'} color="gray.500" mr={2}>
                    {i + 1}
                  </Text>
                  <Flex w="full" shadow="sm" border="1px" borderColor="gray.300" rounded="lg" px={2} py={2}>
                    <Flex w="full" alignItems="center" justifyContent={'space-between'} fontSize="sm">
                      <Flex gap={2} alignItems={'center'}>
                        <Avatar mr={1} borderRadius={'md'} src={queueItem.cover} size="2xs" />
                        <Text fontSize="sm" fontWeight="medium" color="emphasized">
                          {queueItem?.track}
                        </Text>
                        <Text fontSize="xs" color="subtle">
                          {queueItem?.artist}
                        </Text>
                      </Flex>
                      <Flex px={1} gap={2} alignItems="center">
                        <Text fontSize="2xs" color="subtle">
                          {formatTime(queueItem?.duration)}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
        </Flex>
      </Transition>
    </Fragment>
  );
};

export default QueueContainer;
