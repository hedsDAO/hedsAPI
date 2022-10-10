import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Avatar, Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/solid';

const ProfilePictureForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const userData = useSelector((state: RootState) => state.userModel);
  const { preview, file, profileChanges } = useSelector((state: RootState) => state.settingsModel);

  return (
    <FormControl>
      <FormLabel width={'nowrap'}>Profile Picture</FormLabel>
      <Flex px={2} justifyContent={{ base: 'center', md: 'start' }} direction={{ base: 'column', sm: 'row' }} gap={2} alignItems={'center'}>
        <Avatar size={{ base: '2xl', sm: 'xl' }} src={preview || profileChanges?.profilePicture || userData?.profilePicture} />
        <Flex width={{ base: 'full', sm: 'auto' }} gap={2}>
          <input
            ref={inputRef}
            onChange={(e) => dispatch.settingsModel.handleFileUpload(e)}
            type="file"
            className="h-[38px] rounded-full border text-sm text-slate-500 file:rounded-full file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          <Button
            onClick={() => {
              if (file) inputRef.current.value = '';
              dispatch.settingsModel.deleteProfilePicture([profileChanges.profilePicture, preview]);
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
    </FormControl>
  );
};

export default ProfilePictureForm;
