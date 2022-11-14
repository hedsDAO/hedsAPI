import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Badge, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { SecondaryButton } from '@/common/buttons';
import { IconCircleCheck } from '@tabler/icons';
import { ANON_ID_TEXT, BACK_TO_TAPE_BUTTON_TEXT, SUCCESS_MESSAGE_TEXT, SUCCESS_TITLE } from '@modals/screens/submit/models/constants';

const SubmitSucess = () => {
  const dispatch = useDispatch<Dispatch>();
  const { submission } = useSelector((state: RootState) => state.submitModel);
  return (
    <Flex data-testid="submit-success" direction="column" px={2}>
      <Flex direction={'column'} mt={2} px={2} gap={2} alignItems={'center'} justifyContent={'center'}>
        <Flex gap={2} alignItems={'center'} className="animate__animated animate__bounce">
          <IconCircleCheck className="text-green-500" height={'24'} width={'24'} />
          <Heading fontSize={'2xl'} fontWeight="semibold" textColor={'green.500'}>
            {SUCCESS_TITLE}
          </Heading>
        </Flex>
        <Divider mt={-1} mb={3} />
        <Text mb={1} fontSize={'sm'} px={10} textAlign="center" fontWeight={'semibold'}>
          {SUCCESS_MESSAGE_TEXT}
        </Text>
        <Text fontSize={'sm'} px={10} textAlign="center" fontWeight={'light'}>
          {ANON_ID_TEXT}{' '}
          <Badge data-testid="submit-anon-name" bg="gray.200" fontSize={'xs'} py={1} px={2} mx={1}>
            <span className="text-blue-600 font-semibold">{submission?.track}</span>
          </Badge>
        </Text>
        <Divider mt={1} mb={3} />
      </Flex>
      <div className="flex">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{BACK_TO_TAPE_BUTTON_TEXT}</SecondaryButton>
      </div>
    </Flex>
  );
};

export default SubmitSucess;
