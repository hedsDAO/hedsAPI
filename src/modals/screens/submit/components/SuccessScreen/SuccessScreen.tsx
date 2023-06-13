import { Dispatch, store } from '@/store';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

export const SuccessScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const displayName = useSelector(store.select.authModel.selectUserDisplayName);
  //   const submissionId = useSelector(store.select.submitModel.selectSubmissionId)
  return (
    <Stack alignItems={'center'} gap={10}>
      <Text pt={3} px={10} textAlign={'center'} fontSize={'xs'} fontWeight="semibold" color="red.500" letterSpacing={'widest'}>
        DON'T SHARE THESE DETAILS, SUBMISSION NAMES MUST STAY ANONYMOUS.
      </Text>
      <Flex w="50%" gap={4}>
        <Flex rounded="sm" alignItems={'center'} justifyContent="center" bg="heds.bg2" boxSize={'14'}>
          <Text as={'i'} className="fas fa-play" color="white" />
        </Flex>
        <Stack justifyContent={'center'}>
          <Text mt={'0 !important'} fontFamily={'inter'} letterSpacing="wide" color={'white'}>
            {displayName}
          </Text>
          <Text mt={'0 !important'} fontFamily={'inter'} letterSpacing="wide" color={'white'} opacity={'75%'}>
            {displayName}
          </Text>
        </Stack>
      </Flex>
      <Button
        onClick={() => {
          dispatch.submitModel.clearState();
          dispatch.modalModel.setModal(null);
        }}
        w="full"
        colorScheme="whiteAlpha"
        size="sm"
        color="white"
      >
        EXIT
      </Button>
    </Stack>
  );
};
