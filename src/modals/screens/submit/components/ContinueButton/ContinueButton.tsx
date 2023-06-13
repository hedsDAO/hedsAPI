import { Dispatch, store } from '@/store';
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitModelSteps } from '../../models/submitModel';

export const ContinueButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const hasAcceptedTerms = useSelector(store.select.submitModel.selectHasAcceptedTerms);
  return (
    <Button
      onClick={() => dispatch.submitModel.setCurrentStep(SubmitModelSteps.UPLOAD)}
      isDisabled={!hasAcceptedTerms}
      colorScheme="whiteAlpha"
      size="sm"
      color="white"
      w="90%"
    >
      CONTINUE
    </Button>
  );
};
