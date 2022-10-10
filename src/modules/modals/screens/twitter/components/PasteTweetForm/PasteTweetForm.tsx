import { TwitterStep } from '@/modules/modals/screens/twitter/models/twitterModel';
import { Dispatch, RootState } from '@/store';
import { Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { IconAlertCircle } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

const PasteTweetForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const { currentStep, error, loading, pastedTweetUrl, userHash } = useSelector((state: RootState) => state.twitterModel);
  return (
    <FormControl isDisabled={currentStep !== TwitterStep.VERIFY_TWEET} id="paste-tweet">
      <Stack gap={2} spacing={-0.5} direction={'column'} alignItems="baseline" justifyContent={'start'}>
        <FormLabel variant="inline">4. Paste tweet url</FormLabel>
        <InputGroup size="md">
          <Input
            onChange={(e) => dispatch.twitterModel.setPastedTweetUrl(e.target.value)}
            pr="4.5rem"
            type="url"
            fontSize={'sm'}
            placeholder="https://twitter.com/twitterName/status/1517702864168099840"
          />
          <InputRightElement width="4.5rem">
            <Button
              isLoading={loading && currentStep === TwitterStep.VERIFY_TWEET}
              disabled={currentStep !== TwitterStep.VERIFY_TWEET || !pastedTweetUrl}
              bg="green.200"
              h="1.75rem"
              size="sm"
              onClick={() => dispatch.twitterModel.verifyTweet([pastedTweetUrl, userHash])}
            >
              Verify
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
      {error?.length && currentStep === TwitterStep.VERIFY_TWEET && (
        <Flex mt={1} alignItems={'center'} gap={2}>
          <IconAlertCircle className="text-red-500" height={16} width={16} />
          <Text color="red.300">{error}</Text>
        </Flex>
      )}
    </FormControl>
  );
};

export default PasteTweetForm;
