import { User } from '@/models/common';
import { AspectRatio, GridItem, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const CuratorCard = ({ curator }: { curator: User }) => {
  const navigate = useNavigate();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <GridItem colSpan={1} mr={2}>
      <Stack
        border="solid 0.5px"
        borderColor="heds.300"
        px={2}
        pt={2}
        pb={1.5}
        rounded="md"
        bg="heds.bg3"
        onClick={() => navigate(`/u/${curator.wallet}`)}
        _hover={{ cursor: 'pointer' }}
      >
        <AspectRatio ratio={1}>
          <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={hasImageLoaded} fitContent rounded={'sm'}>
            <Image minH="full" minW="full" rounded="sm" onLoad={setHasImageLoaded.on} src={curator.profile_picture} objectFit="cover" />
          </Skeleton>
        </AspectRatio>
        <Text mt={'1.5 !important'} letterSpacing={'wide'} color="white" opacity={'80%'} fontFamily={'inter'} fontWeight="medium" fontSize={'2xs'}>
          {curator.display_name}
        </Text>
      </Stack>
    </GridItem>
  );
};
