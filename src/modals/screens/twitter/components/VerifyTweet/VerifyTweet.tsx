import { Box, Button, Flex, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import * as constants from '@/modals/screens/twitter/models/constants';
import * as styles from '@/modals/screens/twitter/components/VerifyTweet/styles';

export const VerifyTweet = () => {
  const isLoading = useSelector(store.select.twitterModel.selectIsLoading);
  const tweetUrl = useSelector(store.select.twitterModel.selectTweetUrl);
  const twitterWindowUrl = useSelector(store.select.twitterModel.selectTwitterWindowUrl);
  const userHash = useSelector(store.select.twitterModel.selectHash);
  const error = useSelector(store.select.twitterModel.selectError);
  const dispatch = useDispatch<Dispatch>();
  return (
    <>
      <Stack {...styles.$verifyTweetStackStyles}>
        <Text {...styles.$verifyTweetHeadingStyles}>{constants.VERIFY_TWEET_HEADING}</Text>
        <Flex {...styles.$verifyDescriptionFlexContainer}>
          <Text {...styles.$verifyTweetDescriptionStyles}>
            {constants.VERIFY_TWEET_DESCRIPTION.map((text: string, i: number) => (
              <span key={text} style={styles.$verifyTweetDescriptionEmphasis(i % 2 == 0)}>
                {text}
              </span>
            ))}
          </Text>
        </Flex>
        <Box {...styles.$verifyTweetExampleBoxStyles}>
          <Text {...styles.$verifyTweetExampleTextStyles}>{constants.VERIFY_TWEET_EXAMPLE_TEXT}</Text>
        </Box>
      </Stack>
      <Stack {...styles.$verifyTweetStackStyles}>
        <Text {...styles.$verifyTweetHeadingStyles}>{constants.VERIFY_TWEET_SUBHEADING}</Text>
        <Text {...styles.$verifyTweetDescriptionStyles}>{constants.VERIFY_TWEET_SUBHEADING_DESCRIPTION}</Text>
        <Flex {...styles.$verifySubHeadingFlexContainer}>
          <Input {...styles.$verifyTweetInputStyles(error)} onChange={(e) => dispatch.twitterModel.setTweetUrl(e.target.value)} isDisabled={isLoading} />
          <IconButton
            icon={<i className="fa-brands fa-twitter" />}
            {...styles.$verifyTweetIconButtonStyles}
            onClick={() => window.open(twitterWindowUrl[0], twitterWindowUrl[1], twitterWindowUrl[2])}
            isDisabled={isLoading}
          />
          <Button
            isDisabled={!tweetUrl || isLoading}
            {...styles.$verifyTweetButtonStyles(!tweetUrl || isLoading)}
            onClick={() => dispatch.twitterModel.verifyTweet([tweetUrl, userHash])}
          >
            {constants.VERIFY_TWEET_BUTTON_TEXT}
          </Button>
        </Flex>
        <Text {...styles.$verifyTweetErrorTextStyles}>{error}</Text>
      </Stack>
    </>
  );
};
