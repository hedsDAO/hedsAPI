import { store } from '@/store';
import { AspectRatio, Box, Flex, GridItem, Image, SimpleGrid, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const AppearsOn = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const tapeName = useSelector(store.select.songModel.selectTapeName);
  const cover = useSelector(store.select.songModel.selectSongCover);

  return (
    <SimpleGrid gap={5} pt={{ base: 6, lg: 12 }} columns={{ base: 2, lg: 6 }}>
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
      {Array.from(Array(5).keys()).map((i) => (
        <GridItem key={'appears-on' + i} colSpan={1}>
          <Box border="solid 1px" borderColor="heds.bg3" rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2">
            <AspectRatio ratio={1}>
              <Skeleton startColor="heds.bg2" endColor="heds.bg3" minH="full" minW="full" isLoaded={hasImageLoaded} rounded="md" fitContent>
                <Box rounded={'md'} h="full" w="full" />
              </Skeleton>
            </AspectRatio>
            <Text minH="2.5ch" letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'}></Text>
          </Box>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
