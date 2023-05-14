import { Tape } from '@/models/common';
import { AspectRatio, GridItem, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const TapeCard = ({ tape }: { tape: Tape }) => {
  const navigate = useNavigate();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <GridItem colSpan={1} key={tape.id + 'tapes'}>
      <Stack p={2} rounded="lg" bg="heds.bg4" onClick={() => navigate(`/t/${tape.id}`)}>
        <AspectRatio ratio={1}>
          <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={hasImageLoaded} fitContent rounded={'lg'}>
            <Image minH="full" minW="full" onLoad={setHasImageLoaded.on} rounded="lg" src={tape.image} objectFit="cover" />
          </Skeleton>
        </AspectRatio>
        <Text pl={1} letterSpacing={'wide'} color="white" opacity={'80%'} fontFamily={'inter'} fontWeight="medium" fontSize={'sm'}>
          {tape.name}
        </Text>
      </Stack>
    </GridItem>
  );
};
