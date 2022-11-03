import DateCountdown from '@/common/countdown/DateCountdown';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { ClockIcon } from '@heroicons/react/24/solid';

const OpenDateBox = ({ end }: { end: number }) => {
  return (
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
        icon={<ClockIcon height="16" width="16" />}
      />
      <Box w="fit-content" rounded="md" shadow={'sm'} bg="green.50" border={'1px'} borderColor={'green.100'} px={4}>
        <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
          <DateCountdown deadline={end + 7500000000} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default OpenDateBox;
