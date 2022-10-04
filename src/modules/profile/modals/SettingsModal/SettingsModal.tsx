import { useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer } from '@/common/components/containers/ModalContainer/ModalContainer';
import { Avatar, Button, Flex, FormControl, FormLabel, Input, Stack, StackDivider, Switch, Text, Textarea } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { formatWallet, isEmpty } from '@/utils';
import DEFAULT_PROFILE_PICTURE from '/public/default.png';

export const SettingsModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const profileData = useSelector((state: RootState) => state.profileModel);
  // TODO: added character length for bio, add error messages for incompatible i/o.
  const { profileChanges, loading, preview, file, fileType, characters, error } = useSelector((state: RootState) => state.settingsModalModel);
  const profileModalData = useSelector((state: RootState) => state.settingsModalModel);
  useEffect(() => {
    if (profileData) dispatch.settingsModalModel.setProfileModelData(profileData);
    return () => {
      dispatch.settingsModalModel.clearProfileModalState();
    };
  }, []);

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={(isOpen: boolean) => dispatch.modalModel.setModalOpen(isOpen)}>
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          Edit Profile
        </Dialog.Title>
        <Stack spacing="5">
          <Stack spacing="5" divider={<StackDivider />}>
            <FormControl id="public">
              <Stack direction={'row'} spacing={{ base: '1.5', md: '8' }} justify={'space-between'} alignItems={'baseline'}>
                <FormLabel variant="inline">Profile Visibility</FormLabel>
                <Flex justifyContent={'end'} alignItems={'center'} gap={3}>
                  <Text size={'xs'} fontWeight="semibold">
                    {profileChanges?.public ? 'PUBLIC' : 'PRIVATE'}
                  </Text>
                  <Switch
                    onChange={() => dispatch.settingsModalModel.setPublic(!profileChanges?.public)}
                    isChecked={profileChanges?.public}
                    shadow={'none'}
                    outline={'none'}
                    size="md"
                  />
                </Flex>
              </Stack>
            </FormControl>
            <FormControl id="displayName">
              <Stack direction={'row'} spacing={{ base: '1.5', md: '8' }} alignItems="baseline" justifyContent={'space-between'}>
                <FormLabel variant="inline">Display Name</FormLabel>
                <Input
                  onChange={(e) => dispatch.settingsModalModel.setDisplayName(e.target.value.trim())}
                  width={'fit-content'}
                  disabled={!isEmpty(profileChanges?.tracks)}
                  defaultValue={profileChanges?.wallet && (profileChanges?.displayName || formatWallet(profileChanges?.wallet))}
                />
              </Stack>
            </FormControl>
            <FormControl id="picture">
              <Stack direction={'row'} justify={'space-between'} alignItems="center">
                <FormLabel width={'fit-content'} variant="inline">
                  Profile Picture
                </FormLabel>
                <Stack spacing={{ base: '3', md: '5' }} direction={{ base: 'column', sm: 'row' }}>
                  <Flex direction={'column'} alignItems="center" gap={4}>
                    <Avatar size="2xl" src={preview || profileChanges?.profilePicture || DEFAULT_PROFILE_PICTURE} />
                    <Flex gap={2}>
                      <input
                        ref={inputRef}
                        onChange={(e) => dispatch.settingsModalModel.handleFileUpload(e)}
                        type="file"
                        className="h-[38px] rounded-full border text-sm text-slate-500 file:rounded-full file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                      <Button
                        onClick={() => {
                          if (file) inputRef.current.value = '';
                          dispatch.settingsModalModel.deleteProfilePicture([profileChanges.profilePicture, preview]);
                        }}
                        height="38px"
                        bg="red.300"
                        color="white"
                        rounded="full"
                      >
                        <TrashIcon className="h-3 w-3" />
                      </Button>
                    </Flex>
                  </Flex>
                </Stack>
              </Stack>
            </FormControl>
            <FormControl id="bio">
              <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '1.5', md: '8' }} justify={'space-between'}>
                <FormLabel width={'fit-content'} variant="inline">
                  Description
                </FormLabel>
                <Textarea
                  onChange={(e) => dispatch.settingsModalModel.setDescription(e.target.value.trim())}
                  maxW={{ md: '3xl' }}
                  rows={3}
                  resize="none"
                  defaultValue={profileChanges?.description}
                />
              </Stack>
            </FormControl>
          </Stack>
          <Flex gap={2} className="mt-6">
            <Button onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
              Back
            </Button>
            <Button
              isLoading={loading}
              onClick={() => dispatch.settingsModalModel.handleSubmit([profileData, profileModalData])}
              disabled={JSON.stringify(profileData) === JSON.stringify(profileChanges) && !file}
              bg="green.200"
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </Dialog.Panel>
    </ModalContainer>
  );
};
