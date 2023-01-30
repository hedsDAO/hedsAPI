import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { store } from '@/store';

import { Box, Divider, Flex, HStack, Text } from '@chakra-ui/react';

export const TapeHeader = () => {
  const { tape, id } = useParams();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));
  console.log('currentTape', currentTape.name);

  return (
    <Box justifyContent={'center'}>
      <HStack gap={2}>
        <Divider borderColor="gray.700" w="full" />
        {currentTape.name && (
          <Flex gap={3} alignItems={'baseline'}>
            <Text fontFamily={"'Space Mono', monospace"} fontSize="xl" fontWeight="semibold" whiteSpace="nowrap" letterSpacing={'widest'}>
              {currentTape.name}
            </Text>
          </Flex>
        )}
        <Divider borderColor="gray.700" w="full" />
      </HStack>
    </Box>
  );
};
