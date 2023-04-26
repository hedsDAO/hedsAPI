import { Dispatch, store } from '@/store';
import { Center, VStack, Box, Text, Image, useBoolean, Input } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_FORM_TEXT } from '@/modals/screens/settings/models/constants';
import * as styles from '@/modals/screens/settings/components/ProfilePictureForm/styles';

/**
 * @component ProfilePictureForm
 * @description Displays a form to update the user's profile picture.
 * @returns {JSX.Element} - Rendered ProfilePictureForm component.
 */
export const ProfilePictureForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const [isHoveringProfilePicture, setIsHoveringProfilePicture] = useBoolean();
  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const profilePicture = useSelector(store.select.authModel.selectProfilePicture);
  const profilePicturePreview = useSelector(store.select.settingsModel.selectProfilePicturePreview);
  const profilePictureError = useSelector(store.select.settingsModel.selectProfilePictureError);

  useEffect(() => {
    if (!profilePicturePreview) profilePictureInputRef.current.value = '';
  }, [profilePicturePreview]);

  return (
    <Box onMouseEnter={setIsHoveringProfilePicture.on} onMouseLeave={setIsHoveringProfilePicture.off} {...styles.$boxStyles}>
      <Input ref={profilePictureInputRef} onChange={(e) => dispatch.settingsModel.handleProfilePictureUpload(e)} {...styles.$inputStyles} />
      <Image {...styles.$imageStyles(profilePicturePreview || profilePicture, profilePictureError, isHoveringProfilePicture)} />
      <Center onClick={() => profilePictureInputRef.current?.click()} {...styles.$centerStyles}>
        <VStack {...styles.$profileFormVStackStyles}>
          <Text {...styles.$textStyles(profilePictureError, isHoveringProfilePicture)}>
            {profilePictureError?.length ? profilePictureError : PROFILE_FORM_TEXT}
          </Text>
        </VStack>
      </Center>
    </Box>
  );
};
