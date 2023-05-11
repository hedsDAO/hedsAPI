import { Dispatch, store } from '@/store';
import { Button, Fade, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import * as constants from '@/modals/screens/twitter/models/constants';

export const GenerateAndCopyTweet = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const tweet = useSelector(store.select.twitterModel.selectTweet);
  const user = useSelector(store.select.twitterModel.selectUser);
  const isCopied = useSelector(store.select.twitterModel.selectIsCopied);
  const isLoading = useSelector(store.select.twitterModel.selectIsLoading);

  useEffect(() => {
    const copyTextTimer = setTimeout(() => setHasCopied(false), 2000);
    if (hasCopied) copyTextTimer;
    return () => clearTimeout(copyTextTimer);
  }, [hasCopied]);
  return (
    <Stack mb={5}>
      <Text fontFamily={'inter'} color="white" fontSize="sm" fontWeight={'bold'} mt={'0 !important'} letterSpacing={'wide'}>
        {constants.GENERATE_TWEET_HEADING}
      </Text>
      <Text fontFamily={'inter'} color="white" fontSize="xs" opacity="60%" mt={'0 !important'}>
        {constants.GENERATE_TWEET_DESCRIPTION}
      </Text>
      <Flex pt={2} gap={2}>
        <Input
          borderColor={tweet ? 'heds.bg5' : 'heds.bg6'}
          color="gray.200"
          value={tweet || ''}
          bg={tweet ? 'heds.bg2' : 'heds.bg3'}
          isDisabled={!tweet}
          rounded="md"
          size="sm"
        />
        {tweet ? (
          <Button
            isLoading={isLoading}
            onClick={() => {
              dispatch.twitterModal.setIsCopied(true);
              setHasCopied(true);
              navigator.clipboard.writeText(tweet);
            }}
            letterSpacing={'widest'}
            fontFamily={'inter'}
            bg={isCopied ? 'heds.bg7' : 'heds.700'}
            _hover={{ bg: 'heds.bg7', textColor: 'white' }}
            textColor="white"
            fontSize="2xs"
            size="sm"
            isDisabled={isLoading}
            px={7}
          >
            {hasCopied ? <Fade in={hasCopied}>COPIED</Fade> : constants.COPY_TWEET_BUTTON_TEXT}
          </Button>
        ) : (
          <Button
            isLoading={isLoading}
            onClick={() => dispatch.twitterModel.generateTweet(user?.wallet)}
            letterSpacing={'widest'}
            fontFamily={'inter'}
            bg="heds.700"
            _hover={{ bg: 'heds.bg7', textColor: 'white' }}
            textColor="white"
            fontSize="2xs"
            size="sm"
            isDisabled={isLoading}
            px={7}
          >
            {constants.GENERATE_TWEET_BUTTON_TEXT}
          </Button>
        )}
        <Button
          isDisabled={!tweet || !isCopied}
          pointerEvents={!tweet ? 'none' : 'auto'}
          bg={isCopied ? 'heds.700' : 'heds.bg7'}
          color="white"
          letterSpacing={'widest'}
          fontFamily={'inter'}
          fontSize="2xs"
          px={5}
          size="sm"
          onClick={() => dispatch.twitterModel.setCurrentStep(TwitterModalSteps.VERIFY_TWEET)}
        >
          {constants.GENERATE_TWEET_NEXT_BUTTON_TEXT}
        </Button>
      </Flex>
    </Stack>
  );
};
