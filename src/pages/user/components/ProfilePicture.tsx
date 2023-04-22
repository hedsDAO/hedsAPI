import { store } from '@/store';
import { Box, Center, Image, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const ProfilePicture = () => {
  const profile_picture = useSelector(store.select.userModel.selectProfilePicture);
  const [isHovering, setIsHovering] = useBoolean();
  const [hasProfilePictureLoaded, setHasProfilePicturedLoaded] = useBoolean();
  return (
    <Skeleton
      opacity={'100%'}
      rounded={'full'}
      mt={{ base: '-20', lg: '-16' }}
      ml={{ md: '0', lg: '-16' }}
      maxH="160px"
      maxW="160px"
      isLoaded={hasProfilePictureLoaded}
    >
      <Box
        bg="black"
        pos="relative"
        w="160px"
        h="160px"
        rounded="full"
        _hover={{ cursor: 'pointer' }}
        onMouseEnter={setIsHovering.on}
        onMouseLeave={setIsHovering.off}
      >
        <Image
          alt='user profile picture'
          transitionDuration=".3s"
          transitionTimingFunction="ease-in-out"
          onLoad={setHasProfilePicturedLoaded.on}
          rounded="full"
          w="160px"
          h="160px"
          src={profile_picture}
          opacity={isHovering ? 0.2 : 1}
        />
        <Center
          transitionDuration=".2s"
          transitionTimingFunction="ease-in-out"
          display={isHovering ? 'flex' : 'none'}
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          rounded="full"
        >
          <Text fontFamily={'poppins'} fontWeight="bold" fontSize="xl" color="white">
            Edit Profile
          </Text>
        </Center>
      </Box>
    </Skeleton>
  );
};
