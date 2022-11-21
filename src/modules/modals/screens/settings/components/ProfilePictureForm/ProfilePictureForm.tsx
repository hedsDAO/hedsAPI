import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Avatar, Divider, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { PROFILE_PICTURE_TITLE, PROFILE_PICTURE_DESCRIPTION, UPLOAD_BUTTON_TEXT } from '../../models/constants';
import { PrimaryButton, WarningButton } from '@/common/buttons';

const ProfilePictureForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const { connectedUser: userData } = useSelector((state: RootState) => state.userModel);
  const { profilePicturePreview, profilePictureFile, profileChanges, isLoading } = useSelector((state: RootState) => state.settingsModel);
  const handleClick = () => inputRef.current.click();
  return (
    <FormControl>
      <FormLabel mb={3} width={'nowrap'}>
        {PROFILE_PICTURE_TITLE}
        <Text fontWeight="light" textColor={'gray.700'} fontSize={'xs'}>
          {PROFILE_PICTURE_DESCRIPTION}
        </Text>
      </FormLabel>
      <Flex data-testid="profile-picture-form" justifyContent={'space-between'} direction={'row'} gap={2} alignItems={'center'}>
        <Avatar borderRadius={'lg'} size={'md'} src={profilePicturePreview || profileChanges?.profilePicture || userData?.profilePicture} />
        <Divider borderColor="blackAlpha.300" />
        <Flex justifyContent={'center'} width={{ base: 'full', sm: 'auto' }} gap={2}>
          <input ref={inputRef} onChange={(e) => dispatch.settingsModel.handleProfilePictureUpload(e)} type="file" className="hidden" />
          <PrimaryButton isLoading={isLoading} onClick={() => handleClick()} size="xs">
            {UPLOAD_BUTTON_TEXT}
          </PrimaryButton>
          <WarningButton
            size="xs"
            onClick={() => {
              if (profilePictureFile) inputRef.current.value = '';
              dispatch.settingsModel.deleteProfilePicture([profileChanges.profilePicture, profilePicturePreview]);
            }}
          >
            <TrashIcon className="h-3 w-3" />
          </WarningButton>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default ProfilePictureForm;
