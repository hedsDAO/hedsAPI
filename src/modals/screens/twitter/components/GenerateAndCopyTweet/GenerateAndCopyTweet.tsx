import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Button, Fade, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import * as constants from '@/modals/screens/twitter/models/constants';
import * as styles from '@/modals/screens/twitter/components/GenerateAndCopyTweet/styles';

export const GenerateAndCopyTweet = () => {
  const dispatch = useDispatch<Dispatch>();
  const tweet = useSelector(store.select.twitterModel.selectTweet);
  const isCopied = useSelector(store.select.twitterModel.selectIsCopied);
  const hasCopied = useSelector(store.select.twitterModel.selectHasCopied);
  const isLoading = useSelector(store.select.twitterModel.selectIsLoading);
  const user = useSelector(store.select.authModel.selectUser);
  
  return (
    <Stack {...styles.$generateAndCopyTweetStackStyles}>
      <Text {...styles.$generateTweetHeadingStyles}>{constants.GENERATE_TWEET_HEADING}</Text>
      <Text {...styles.$generateTweetDescriptionStyles}>{constants.GENERATE_TWEET_DESCRIPTION}</Text>
      <Flex {...styles.$generateAndCopyTweetFlexStyles}>
        <Input readOnly data-testid='twitter-input' {...styles.$inputStyles(tweet)} />
        {tweet ? (
          <Button isLoading={isLoading} onClick={() => dispatch.twitterModel.handleCopy(tweet)} {...styles.$copyTweetButtonStyles}>
            {hasCopied ? <Fade in={hasCopied}>{constants.COPY_TWEET_COPIED_TEXT}</Fade> : constants.COPY_TWEET_BUTTON_TEXT}
          </Button>
        ) : (
          <Button isLoading={isLoading} onClick={() => dispatch.twitterModel.generateTweet(user?.wallet)} {...styles.$generateTweetButtonStyles}>
            {constants.GENERATE_TWEET_BUTTON_TEXT}
          </Button>
        )}
        <Button
          isDisabled={!tweet || !isCopied}
          onClick={() => dispatch.twitterModel.setCurrentStep(TwitterModalSteps.VERIFY_TWEET)}
          {...styles.$nextButtonStyles}
        >
          {constants.GENERATE_TWEET_NEXT_BUTTON_TEXT}
        </Button>
      </Flex>
    </Stack>
  );
};
