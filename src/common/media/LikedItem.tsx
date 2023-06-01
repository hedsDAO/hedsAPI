import { AspectRatio, Box, Image, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const LikedItem = ({ image, name, link }: { image: string; name: string; link: string }) => {
  const navigate = useNavigate();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <Box
      pointerEvents={'auto'}
      onClick={() => {
        if (window) window?.scrollTo(0, 0);
        navigate(`/song/${link}`)
      }}
      data-testid="liked-item"
      border="solid 1px"
      borderColor="heds.100"
      rounded={'md'}
      px={3}
      pt={3}
      pb={2}
      bg="heds.bg2"
    >
      <AspectRatio ratio={1}>
        <Skeleton minH="full" minW="full" isLoaded={hasImageLoaded} rounded="md" fitContent>
          <Image onLoad={setHasImageLoaded.on} border="solid 1px" borderColor="heds.100" rounded={'md'} src={image} />
        </Skeleton>
      </AspectRatio>
      <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'}>
        {name}
      </Text>
    </Box>
  );
};
