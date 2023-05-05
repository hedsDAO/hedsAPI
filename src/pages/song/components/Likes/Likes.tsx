import { User } from '@/models/common';
import { store } from '@/store';
import { AspectRatio, Box, GridItem, Image, SimpleGrid, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Likes = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const navigate = useNavigate();
  const songLikes = useSelector(store.select.songModel.selectSongLikes);
  const handleNavigate = (user: User) => () => navigate(`/u/${user?.wallet}`);
  return (
    <SimpleGrid gap={5} pt={{ base: 6, lg: 12 }} columns={{ base: 2, lg: 6 }}>
      {songLikes?.length
        ? songLikes?.slice(0, 6)?.map((user: User, index: number) => (
            <GridItem key={'related' + user.id} colSpan={1}>
              <Box onClick={handleNavigate(user)} border="solid 1px" borderColor="heds.100" rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2">
                <AspectRatio ratio={1}>
                  <Skeleton rounded="full" isLoaded={hasImageLoaded}>
                    <Image onLoad={setHasImageLoaded.on} border="solid 1px" borderColor="heds.100" rounded={'full'} src={user?.profile_picture} />
                  </Skeleton>
                </AspectRatio>
                <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'}>
                  {user?.display_name}
                </Text>
              </Box>
            </GridItem>
          ))
        : [0, 1, 2, 3, 4, 5].map((_, index: number) => (
            <GridItem key={'related' + index} colSpan={1}>
              <Box rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2" opacity={'30%'}>
                <AspectRatio ratio={1}>
                  <Box h="full" w="full" rounded={'full'} />
                </AspectRatio>
                <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'} minH="2.5ch" minW="10ch"></Text>
              </Box>
            </GridItem>
          ))}
    </SimpleGrid>
  );
};
