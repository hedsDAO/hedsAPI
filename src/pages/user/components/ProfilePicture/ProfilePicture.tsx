import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Center, Image, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import * as styles from './styles';
import { Modals } from '@/modals/models/modalModel';

/**
 * @function ProfilePicture
 * @description Renders a user's profile picture with a hover effect to display an "Edit Profile" text.
 * It also displays a skeleton before the image is loaded.
 * @returns {JSX.Element} - Rendered component.
 **/

export const ProfilePicture = () => {
  const dispatch = useDispatch<Dispatch>();
  const profile_picture = useSelector(store.select.userModel.selectProfilePicture);
  const [isHovering, setIsHovering] = useBoolean();
  const [hasProfilePictureLoaded, setHasProfilePicturedLoaded] = useBoolean();
  return (
    <Skeleton {...styles.$skeletonStyles(hasProfilePictureLoaded)}>
      <Box onClick={() => dispatch.modalModel.setModal(Modals.SETTINGS)} {...styles.$boxStyles(isHovering, setIsHovering.on, setIsHovering.off)}>
        <Image {...styles.$imageStyles(profile_picture, isHovering, setHasProfilePicturedLoaded.on)} />
        <Center {...styles.$centerStyles(isHovering)}>
          <Text {...styles.$textStyles}>Edit Profile</Text>
        </Center>
      </Box>
    </Skeleton>
  );
};
