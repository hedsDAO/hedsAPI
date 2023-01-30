import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { DateTime } from 'luxon';

const UpcomingDateBox = ({ start }: { start: DateTime }) => {
  return (
    <Flex my={3} alignItems={'stretch'} gap={2}>
      <IconButton
        rounded="sm"
        disabled
        bg="gray.300"
        shadow={'sm'}
        aria-label="mint"
        icon={<LockClosedIcon className="text-gray-400" height="16" width="16" />}
      />
      <Box w="fit-content" rounded="sm" shadow={'sm'} bg="gray.50" border={'1px'} borderColor={'gray.100'} px={4}>
        <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
          <Text textColor={'gray.400'} fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
            {start.toLocaleString({
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UpcomingDateBox;
