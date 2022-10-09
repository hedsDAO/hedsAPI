import { TwitterStep } from '@/modals/screens/twitter/models/twitterModel';
import { Dispatch, RootState } from '@/store';
import { Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { Transition } from '@headlessui/react';
import { IconCheck, IconClipboard } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

const CopyTweetForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const { currentStep, copied, hashedTweet } = useSelector((state: RootState) => state.twitterModel);
  return (
    <FormControl isDisabled={currentStep !== TwitterStep.COPY_TWEET} id="copy-tweet">
      <Stack direction={'row'} spacing={{ base: '1.5', md: '8' }} alignItems="baseline" justifyContent={'space-between'}>
        <FormLabel variant="inline">2. Copy unique tweet</FormLabel>
        <Flex>
          <Transition
            show={copied}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="text-[0.75rem] my-auto px-2 mx-2 font-bold text-green-400 rounded-lg"
            as="div"
            children={<IconCheck height={16} width={16} />}
          />
          <Button
            disabled={currentStep !== TwitterStep.COPY_TWEET}
            leftIcon={<IconClipboard height={16} width={16} />}
            size={'sm'}
            onClick={() => {
              dispatch.twitterModel.setCopied(true);
              navigator.clipboard.writeText(hashedTweet);
              setTimeout(() => {
                dispatch.twitterModel.setCopied(false);
                dispatch.twitterModel.setCurrentStep(TwitterStep.TWEET_HASH);
              }, 1000);
            }}
            bg="gray.200"
          >
            Copy tweet
          </Button>
        </Flex>
      </Stack>
    </FormControl>
  );
};

export default CopyTweetForm;
