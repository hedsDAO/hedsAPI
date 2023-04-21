import { Box, Image, Skeleton, Text, useBoolean, AspectRatio } from '@chakra-ui/react';

export const CollectionItem = ({ image, name }: { image: string; name: string }) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <Box data-testid="collection-item" border="solid 1px" borderColor="heds.100" rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2">
      <AspectRatio ratio={1}>
        <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={hasImageLoaded} fitContent rounded={'md'}>
          <Image onLoad={setHasImageLoaded.on} border="solid 1px" borderColor="heds.100" rounded={'md'} src={image} />
        </Skeleton>
      </AspectRatio>
      <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'}>
        {name}
      </Text>
    </Box>
  );
};
