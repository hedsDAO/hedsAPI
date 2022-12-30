import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { DateTime } from 'luxon';

const ClosedDateBox = ({ start, end }: { start: DateTime; end: DateTime }) => {
  return (
    <Flex my={3} alignItems={'stretch'} gap={2}>
      <IconButton rounded='sm' pointerEvents={'none'} _hover={{ background: 'gray.100' }} bg="gray.100" aria-label="" icon={<CheckIcon height="16" width="16" />} />
      <Box w="fit-content" rounded="sm" shadow={'sm'} bg="gray.100" border={'1px'} borderColor={'gray.200'} px={4}>
        <Flex h="full" alignItems={'center'} justifyContent="center" gap={2}>
          <Text textColor={'gray.600'} fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
            {start.toLocaleString({ month: 'numeric', day: 'numeric', year: 'numeric' })}
          </Text>
          <Text textColor={'gray.600'} className="relative bottom-[0.1rem]">
            {'-'}
          </Text>
          <Text textColor={'gray.600'} fontWeight={'medium'} letterSpacing="widest" fontSize={'xs'}>
            {end.toLocaleString({ month: 'numeric', day: 'numeric', year: 'numeric' })}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ClosedDateBox;
