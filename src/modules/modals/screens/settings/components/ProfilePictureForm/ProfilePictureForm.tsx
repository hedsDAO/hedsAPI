import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Avatar, Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { IconUpload } from '@tabler/icons';

const ProfilePictureForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const userData = useSelector((state: RootState) => state.userModel);
  const { profilePicturePreview, profilePictureFile, profileChanges } = useSelector((state: RootState) => state.settingsModel);
  const handleClick = () => inputRef.current.click();
  return (
    <FormControl>
      <FormLabel width={'nowrap'}>Profile Picture</FormLabel>
      <Flex justifyContent={'start'} direction={{ base: 'column', sm: 'column' }} gap={2} alignItems={'start'}>
        <Avatar
          borderRadius={'lg'}
          size={{ base: '2xl', sm: '2xl' }}
          src={profilePicturePreview || profileChanges?.profilePicture || userData?.profilePicture}
        />
        <Flex pt={1} width={{ base: 'full', sm: 'auto' }} gap={2}>
          <input ref={inputRef} onChange={(e) => dispatch.settingsModel.handleProfilePictureUpload(e)} type="file" className="hidden" />
          <Button px={4} size="sm" onClick={() => handleClick()} bg={'green.200'} rounded="full">
            <IconUpload className="h-3 w-3" />
          </Button>
          <Button
            px={4}
            size="sm"
            onClick={() => {
              if (profilePictureFile) inputRef.current.value = '';
              dispatch.settingsModel.deleteProfilePicture([profileChanges.profilePicture, profilePicturePreview]);
            }}
            // border="1px"
            rounded="full"
            bg={'red.200'}
          >
            <TrashIcon className="h-3 w-3" />
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default ProfilePictureForm;
