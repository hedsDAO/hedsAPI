import { Fragment, useEffect } from 'react';
import { ModalContainer } from '@/common/components/containers/ModalContainer/ModalContainer';
import { Dispatch, RootState } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, StackDivider, Tag, TagLabel, Text } from '@chakra-ui/react';
import { IconAlertCircle, IconCheck, IconClipboard, IconKey, IconLink } from '@tabler/icons';
import { formatWallet } from '@/utils';
import { TwitterStep } from '../../models/twitterModalModel';

export const TwitterModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { currentStep, loading, hashedTweet, copied, windowParams, pastedTweetUrl, userHash, twitterHandle } = useSelector(
    (state: RootState) => state.twitterModalModel,
  );
  // TODO: add error messages for incompatible i/o.
  const profileData = useSelector((state: RootState) => state.profileModel);
  useEffect(() => {
    return () => {
      dispatch.twitterModalModel.clearTwitterModalState();
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
                      onClick={() => dispatch.twitterModalModel.generateHash(profileData?.wallet)}
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
                        dispatch.twitterModalModel.setCopied(true);
                        navigator.clipboard.writeText(hashedTweet);
                        setTimeout(() => {
                          dispatch.twitterModalModel.setCopied(false);
                          dispatch.twitterModalModel.setCurrentStep(TwitterStep.TWEET_HASH);
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
                          dispatch.twitterModalModel.setCurrentStep(TwitterStep.VERIFY_TWEET);
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
                <Stack spacing={-1} direction={'row'} alignItems="baseline" justifyContent={'start'}>
                  <FormLabel variant="inline">4.</FormLabel>
                  <InputGroup size="md">
                    <Input
                      onChange={(e) => dispatch.twitterModalModel.setPastedTweetUrl(e.target.value)}
                      pr="4.5rem"
                      type="url"
                      placeholder="Paste tweet url here"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        isLoading={loading && currentStep === TwitterStep.VERIFY_TWEET}
                        disabled={currentStep !== TwitterStep.VERIFY_TWEET || !pastedTweetUrl}
                        bg="green.200"
                        h="1.75rem"
                        size="sm"
                        onClick={() => dispatch.twitterModalModel.verifyTweet([pastedTweetUrl, userHash])}
                      >
                        Verify
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Stack>
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
                    src={profileData?.profilePicture}
                    size="2xs"
                    name={profileData?.displayName ? profileData?.displayName : profileData?.wallet ? formatWallet(profileData?.wallet) : ''}
                    ml={-1}
                    mr={2}
                  />
                  <TagLabel> {profileData?.displayName ? profileData?.displayName : profileData?.wallet ? formatWallet(profileData?.wallet) : ''}</TagLabel>
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
                onClick={() => dispatch.twitterModalModel.linkTwitterHandleToUser([profileData.wallet, profileData, twitterHandle])}
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
