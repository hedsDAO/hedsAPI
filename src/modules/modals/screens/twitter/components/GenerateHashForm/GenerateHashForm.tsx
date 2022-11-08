import { TwitterStep } from '@/modules/modals/screens/twitter/models/twitterModel';
import { Dispatch, RootState } from '@/store';
import { Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { IconKey } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

const GenerateHashForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const profileData = useSelector((state: RootState) => state.profileModel);
  const { currentStep, loading } = useSelector((state: RootState) => state.twitterModel);

  return (
    <FormControl isDisabled={currentStep !== TwitterStep.GENERATE_HASH} id="generate-hash">
      <Stack direction={'row'} spacing={{ base: '1.5', md: '8' }} justify={'space-between'} alignItems={'baseline'}>
        <FormLabel variant="inline">1. Generate unique tweet</FormLabel>
        <Flex justifyContent={'end'} alignItems={'center'} gap={3}>
          <Button
            isLoading={loading && currentStep === TwitterStep.GENERATE_HASH}
            loadingText="Generating"
            disabled={currentStep !== TwitterStep.GENERATE_HASH}
            leftIcon={<IconKey height={16} width={16} />}
            size={'sm'}
            onClick={() => dispatch.twitterModel.generateHash(profileData?.wallet)}
            bg="gray.200"
          >
            Generate hash
          </Button>
        </Flex>
      </Stack>
    </FormControl>
  );
};

export default GenerateHashForm;
