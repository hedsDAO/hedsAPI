import { TwitterStep } from '@/modules/modals/screens/twitter/models/common';
import { Dispatch, RootState } from '@/store';
import { Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { IconLink } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

const TweetHashForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const { windowParams, currentStep } = useSelector((state: RootState) => state.twitterModel);
  return (
    <FormControl isDisabled={currentStep !== TwitterStep.TWEET_HASH} id="tweet-hash">
      <Stack direction={'row'} spacing={{ base: '1.5', md: '8' }} alignItems="baseline" justifyContent={'space-between'}>
        <FormLabel variant="inline">3. Tweet on your account</FormLabel>
        <Flex>
          <Button
            disabled={currentStep !== TwitterStep.TWEET_HASH}
            leftIcon={<IconLink height={16} width={16} />}
            size={'sm'}
            onClick={() => {
              window.open(windowParams[0], windowParams[1], windowParams[2]);
              setTimeout(() => {
                dispatch.twitterModel.setCurrentStep(TwitterStep.VERIFY_TWEET);
              }, 1000);
            }}
            bg="gray.200"
          >
            Open Twitter
          </Button>
        </Flex>
      </Stack>
    </FormControl>
  );
};

export default TweetHashForm;
