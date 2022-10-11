import { RootState } from '@/store';
import { Flex, Stack, StackDivider, Avatar, Text, Box } from '@chakra-ui/react';
import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

const DesktopQueue = () => {
  const audioData = useSelector((state: RootState) => state.audioModel);
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
      <Box className="relative h-full w-screen bg-gray-200">
        <Text mb={2} px={2} fontSize={'lg'} fontWeight={'bold'}>
          Up Next
        </Text>
        <Stack divider={<StackDivider />} fontSize="sm" px="2" py={3} spacing="0.5">
          <Flex alignItems="center">
            <Avatar size="sm" />
            <Flex direction="column">
              <Text fontWeight="medium" color="emphasized">
                Track Name
              </Text>
              <Text color="subtle">Artist Name</Text>
            </Flex>
          </Flex>
          <Flex alignItems="center">
            <Avatar size="sm" />
            <Flex direction="column">
              <Text fontWeight="medium" color="emphasized">
                Track Name
              </Text>
              <Text color="subtle">Artist Name</Text>
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </Transition>
  );
};

export default DesktopQueue;
