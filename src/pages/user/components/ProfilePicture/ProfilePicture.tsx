import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Box, Center, Image, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import * as styles from './styles';

/**
 * @function ProfilePicture
 * @description Renders a user's profile picture with a hover effect to display an "Edit Profile" text. 
 * It also displays a skeleton before the image is loaded.
 * @returns {JSX.Element} - Rendered component.
 **/

export const ProfilePicture = () => {
  const profile_picture = useSelector(store.select.userModel.selectProfilePicture);
  const [isHovering, setIsHovering] = useBoolean();
  const [hasProfilePictureLoaded, setHasProfilePicturedLoaded] = useBoolean();
  return (
    <Skeleton {...styles.$skeletonStyles(hasProfilePictureLoaded)}>
      <Box {...styles.$boxStyles(isHovering, setIsHovering.on, setIsHovering.off)}>
        <Image {...styles.$imageStyles(profile_picture, isHovering, setHasProfilePicturedLoaded.on)} />
        <Center {...styles.$centerStyles(isHovering)}>
          <Text {...styles.$textStyles}>Edit Profile</Text>
        </Center>
      </Box>
    </Skeleton>
  );
};
