import { Box, Image, Skeleton, Text, useBoolean } from '@chakra-ui/react';

export const TrackItem = ({ image, name }: { image: string; name: string }) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <Box border="solid 1px" borderColor="heds.100" rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2">
      <Skeleton minH="full" minW="full" isLoaded={hasImageLoaded} rounded="md" fitContent>
        <Image onLoad={setHasImageLoaded.on} border="solid 1px" borderColor="heds.100" rounded={'md'} src={image} />
      </Skeleton>
      <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'}>
        {name}
      </Text>
    </Box>
  );
};
