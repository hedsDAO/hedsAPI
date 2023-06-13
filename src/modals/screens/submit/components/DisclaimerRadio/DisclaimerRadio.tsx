import { Dispatch, store } from '@/store';
import { Flex, Radio, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

export const DisclaimerRadio = () => {
  const hasAcceptedTerms = useSelector(store.select.submitModel.selectHasAcceptedTerms);
  const dispatch = useDispatch<Dispatch>();
  return (
    <Flex alignItems="center" justifyContent="center">
      <Radio
        isChecked={hasAcceptedTerms}
        onClick={() => dispatch.submitModel.setHasAcceptedTerms(!hasAcceptedTerms)}
        border="solid 1px"
        borderColor={'heds.200'}
        size="sm"
      />
      <Text letterSpacing={'wider'} fontFamily={'inter'} fontSize="xs" color="white" opacity={'80%'} ml={3}>
        I UNDERSTAND AND AGREE
      </Text>
    </Flex>
  );
};
