import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { Dispatch, RootState } from '@/store';
import { Badge, Divider, Flex, Text } from '@chakra-ui/react';
import { IconCircleCheck } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

const SubmitSucess = () => {
  const dispatch = useDispatch<Dispatch>();
  const { pendingSubmission } = useSelector((state: RootState) => state.submitModel);
  return (
    <Flex direction="column" px={2}>
      <Flex direction={'column'} mt={2} px={2} gap={2} alignItems={'center'} justifyContent={'center'}>
        <Flex gap={2} alignItems={'center'} className="animate__animated animate__bounce">
          <IconCircleCheck className="text-green-500" height={'24'} width={'24'} />
          <Text fontSize={'2xl'} fontWeight="semibold" textColor={'green.500'}>
            Success
          </Text>
        </Flex>
        <Divider mb={3} />
        <Text mb={1} fontSize={'sm'} px={10} textAlign="center" fontWeight={'semibold'}>
          Your submission has been successfully submitted.
        </Text>
        <Text fontSize={'sm'} px={10} textAlign="center" fontWeight={'light'}>
          Your anonymous id is{' '}
          <Badge bg="gray.200" fontSize={'xs'} py={1} px={2} mx={1}>
            <span className="text-blue-600 font-semibold">{pendingSubmission.track}</span>
          </Badge>
        </Text>
        <Divider my={3} />
      </Flex>
      <div className="flex">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{'Back to tape'}</SecondaryButton>
      </div>
    </Flex>
  );
};

export default SubmitSucess;
