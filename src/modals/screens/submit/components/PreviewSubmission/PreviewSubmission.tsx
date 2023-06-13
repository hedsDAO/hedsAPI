import { Dispatch, store } from '@/store';
import { Box, Flex, Stack, Text, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitModelSteps } from '../../models/submitModel';

export const PreviewSubmission = () => {
  const dispatch = useDispatch<Dispatch>();
  const displayName = useSelector(store.select.authModel.selectUserDisplayName);
  return (
    <Stack gap={2}>
      <Flex gap={4}>
        <Flex rounded="sm" alignItems={'center'} justifyContent="center" bg="heds.bg2" boxSize={'14'}>
          <Text as={'i'} className="fas fa-play" color="white" />
        </Flex>
        <Stack justifyContent={'center'}>
          <Text mt={'0 !important'} fontFamily={'inter'} letterSpacing="wide" color={'white'}>
            {displayName}
          </Text>
          <Box minH="1ch" minW="14ch" bg="whiteAlpha.600" opacity={'70%'} rounded="lg" />
        </Stack>
      </Flex>
      <Button onClick={() => dispatch.submitModel.setCurrentStep(SubmitModelSteps.UPLOADING)} colorScheme="whiteAlpha" size="sm" color="white">
        UPLOAD
      </Button>
    </Stack>
  );
};
