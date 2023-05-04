import { store } from '@/store';
import { AspectRatio, Box, Flex, GridItem, Image, SimpleGrid, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const AppearsOn = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const tapeName = useSelector(store.select.songModel.selectTapeName);
  const cover = useSelector(store.select.songModel.selectSongCover);

  return (
    <SimpleGrid gap={5} pt={12} columns={6}>
      <GridItem colSpan={1}>
        <Box border="solid 1px" borderColor="heds.100" rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2">
          <AspectRatio ratio={1}>
            <Skeleton minH="full" minW="full" isLoaded={hasImageLoaded} rounded="md" fitContent>
              <Image onLoad={setHasImageLoaded.on} border="solid 1px" borderColor="heds.100" rounded={'md'} src={cover} />
            </Skeleton>
          </AspectRatio>
          <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'}>
            {tapeName}
          </Text>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};
