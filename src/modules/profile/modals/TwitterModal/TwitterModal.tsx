import { useEffect } from 'react';
import { ModalContainer } from '@/common/containers/ModalContainer/ModalContainer';
import { Dispatch, RootState } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, StackDivider, Tag, TagLabel, Text } from '@chakra-ui/react';
import { IconAlertCircle, IconCheck, IconClipboard, IconKey, IconLink } from '@tabler/icons';
import { formatWallet } from '@/utils';
import { TwitterStep } from '../../models/twitterModel';

export const TwitterModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { currentStep, loading, hashedTweet, copied, windowParams, pastedTweetUrl, userHash, twitterHandle, error } = useSelector(
    (state: RootState) => state.twitterModel,
  );
  const userData = useSelector((state: RootState) => state.userModel);
  useEffect(() => {
    return () => {
      dispatch.twitterModel.clearTwitterModalState();
    };
  }, []);
  return (
    <ModalContainer isOpen={isOpen} setModalOpen={(isOpen: boolean) => dispatch.modalModel.setModalOpen(isOpen)}>
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          Twitter Verification
        </Dialog.Title>
        <Stack spacing="5">
          {currentStep !== TwitterStep.LINK_ACCOUNT && (
            <Stack spacing="5" divider={<StackDivider />}>
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
                      onClick={() => dispatch.twitterModel.generateHash(userData?.wallet)}
                      bg="gray.200"
                    >
                      Generate hash
                    </Button>
                  </Flex>
                </Stack>
              </FormControl>
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
            </Stack>
          )}
          {currentStep === TwitterStep.LINK_ACCOUNT && (
            <FormControl id="verify-confirm">
              <Flex gap={3} flexDirection={'column'}>
                <FormLabel variant="inline">5. Verify and link accounts</FormLabel>
                <Flex gap={2} alignItems={'center'}>
                  <IconAlertCircle height={18} width={18} />
                  <Text>Artist Disclaimer</Text>
                </Flex>
                <Text fontSize="sm">
                  To maintain artist identity, if you are featured on a heds compliation, your twitter handle will be linked to your account indefinitely.
                </Text>
              </Flex>
              <Flex alignItems={'center'} my={5} gap={4} direction={'row'}>
                <Tag size="lg" colorScheme="blue" borderRadius="full">
                  <Avatar
                    src={userData?.profilePicture}
                    size="2xs"
                    name={userData?.displayName ? userData?.displayName : userData?.wallet ? formatWallet(userData?.wallet) : ''}
                    ml={-1}
                    mr={2}
                  />
                  <TagLabel> {userData?.displayName ? userData?.displayName : userData?.wallet ? formatWallet(userData?.wallet) : ''}</TagLabel>
                </Tag>
                <IconLink height={20} width={20} />
                <Tag py={1} size="lg" colorScheme="blue" borderRadius="full">
                  <TagLabel>{twitterHandle}</TagLabel>
                </Tag>
              </Flex>
            </FormControl>
          )}
          <Flex gap={2} className="mt-6">
            <Button onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
              Back
            </Button>
            {currentStep === TwitterStep.LINK_ACCOUNT && (
              <Button
                isLoading={loading}
                onClick={() => dispatch.twitterModel.linkTwitterHandleToUser([userData.wallet, userData, twitterHandle])}
                bg="green.200"
              >
                Confirm
              </Button>
            )}
          </Flex>
        </Stack>
      </Dialog.Panel>
    </ModalContainer>
  );
};
