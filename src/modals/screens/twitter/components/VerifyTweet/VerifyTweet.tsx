import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import * as constants from '@/modals/screens/twitter/models/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { TwitterModalSteps } from '../../models/common';

export const VerifyTweet = () => {
  const isLoading = useSelector(store.select.twitterModel.selectIsLoading);
  const tweetUrl = useSelector(store.select.twitterModel.selectTweetUrl);
  const dispatch = useDispatch<Dispatch>();
  return (
    <>
      <Stack mb={5}>
        <Text ml={0.5} fontFamily={'inter'} color="white" fontSize="xs" fontWeight={'bold'} mt={'0 !important'} letterSpacing={'wide'}>
          {constants.VERIFY_TWEET_HEADING}
        </Text>
        <Flex pb={2} mt={'0 !important'} alignItems={'baseline'}>
          <Text ml={0.5} fontFamily={'inter'} color="white" fontSize="2xs" mt={'0 !important'}>
            {constants.VERIFY_TWEET_DESCRIPTION.map((text, index) =>
              index % 2 ? (
                <span style={{ fontWeight: 'bold', marginRight: '2px', opacity: '90%' }}>{text}</span>
              ) : (
                <span style={{ marginRight: '2px', opacity: '60%' }}>{text}</span>
              ),
            )}
          </Text>
        </Flex>
        <Box px={1} rounded="md" w={'fit-content'} bg="heds.bg8">
          <Text p={0.5} color="white" opacity="90%" fontSize={'2xs'}>
            {constants.VERIFY_TWEET_EXAMPLE_TEXT}
          </Text>
        </Box>
      </Stack>
      <Stack mb={5}>
        <Text ml={0.5} fontFamily={'inter'} color="white" fontSize="xs" fontWeight={'bold'} mt={'0 !important'} letterSpacing={'wide'}>
          {constants.VERIFY_TWEET_SUBHEADING}
        </Text>
        <Text ml={0.5} fontFamily={'inter'} color="white" fontSize="2xs" opacity="60%" mt={'0 !important'}>
          {constants.VERIFY_TWEET_SUBHEADING_DESCRIPTION}
        </Text>
        <Flex pt={2} gap={2}>
          <Input
            onChange={(e) => dispatch.twitterModel.setTweetUrl(e.target.value)}
            borderColor={'heds.bg5'}
            color="gray.200"
            bg={'heds.bg2'}
            rounded="md"
            size="sm"
          />
          <Button
            isDisabled={tweetUrl?.length === 0}
            isLoading={isLoading}
            pointerEvents={'auto'}
            bg={'heds.700'}
            color="white"
            letterSpacing={'widest'}
            fontFamily={'inter'}
            fontSize="2xs"
            px={5}
            size="sm"
            onClick={() => dispatch.twitterModal.verifyTweet(tweetUrl)}
          >
            {constants.VERIFY_TWEET_BUTTON_TEXT}
          </Button>
        </Flex>
      </Stack>
    </>
  );
};
