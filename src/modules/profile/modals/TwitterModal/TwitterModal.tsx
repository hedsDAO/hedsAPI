import { useEffect } from 'react';
import { ModalContainer } from '@/common/components/containers/ModalContainer/ModalContainer';
import { Dispatch, RootState } from '@/store';
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StackDivider,
  Switch,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { IconAlertCircle, IconClipboard, IconKey, IconLink } from '@tabler/icons';
import { formatWallet } from '@/utils';

export const TwitterModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const twitterModalData = useSelector((state: RootState) => state.twitterModalModel);
  const profileData = useSelector((state: RootState) => state.profileModel);
  console.log(twitterModalData);

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
          <Stack spacing="5" divider={<StackDivider />}>
            <FormControl id="generate-hash">
              <Stack direction={'row'} spacing={{ base: '1.5', md: '8' }} justify={'space-between'} alignItems={'baseline'}>
                <FormLabel variant="inline">1. Generate unique tweet</FormLabel>
                <Flex justifyContent={'end'} alignItems={'center'} gap={3}>
                  <Button leftIcon={<IconKey height={16} width={16} />} size={'sm'} onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
                    Generate hash
                  </Button>
                </Flex>
              </Stack>
            </FormControl>
            <FormControl id="copy-tweet">
              <Stack direction={'row'} spacing={{ base: '1.5', md: '8' }} alignItems="baseline" justifyContent={'space-between'}>
                <FormLabel variant="inline">2. Copy unique tweet</FormLabel>
                <Flex>
                  <Button leftIcon={<IconClipboard height={16} width={16} />} size={'sm'} onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
                    Copy tweet
                  </Button>
                </Flex>
              </Stack>
            </FormControl>
            <FormControl id="tweet-hash">
              <Stack direction={'row'} spacing={{ base: '1.5', md: '8' }} alignItems="baseline" justifyContent={'space-between'}>
                <FormLabel variant="inline">3. Tweet on your account</FormLabel>
                <Flex>
                  <Button leftIcon={<IconLink height={16} width={16} />} size={'sm'} onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
                    Open Twitter
                  </Button>
                </Flex>
              </Stack>
            </FormControl>
            <FormControl id="paste-tweet">
              <Stack spacing={-1} direction={'row'} alignItems="baseline" justifyContent={'start'}>
                <FormLabel variant="inline">4.</FormLabel>
                <InputGroup size="md">
                  <Input pr="4.5rem" type="url" placeholder="Paste tweet url here" />
                  <InputRightElement width="4.5rem">
                    <Button bg="green.200" h="1.75rem" size="sm" onClick={() => {}}>
                      Verify
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </FormControl>
            <FormControl id="verify-confirm">
              <Flex gap={3} flexDirection={'column'} alignItems={'center'}>
                <FormLabel variant="inline">5. Verify and link accounts</FormLabel>
                <Flex gap={1} justifyContent="center" alignItems={'center'}>
                  <IconAlertCircle height={18} width={18} /> Artist Disclaimer
                </Flex>
                <Text textAlign={'center'} fontSize="sm">
                  To maintain artist identity, if you are featured on a heds compliation, your twitter handle will be linked to your account indefinitely.
                </Text>
              </Flex>
              <Flex my={5} gap={4} direction={'row'} justifyContent="center" alignItems={'center'}>
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
                  <TagLabel> @twitterHandle</TagLabel>
                </Tag>
              </Flex>
            </FormControl>
          </Stack>
          <Flex justifyContent={'center'} gap={2} className="mt-6">
            <Button onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
              Back
            </Button>
            <Button bg="green.200">Verify</Button>
          </Flex>
        </Stack>
      </Dialog.Panel>
    </ModalContainer>
  );
};
