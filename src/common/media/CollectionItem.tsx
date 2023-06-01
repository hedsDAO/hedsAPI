import { TapeCollectionItem } from '@/models/common';
import { Box, Image, Skeleton, Text, useBoolean, AspectRatio, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const CollectionItem = ({ item }: { item: TapeCollectionItem }) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <Box data-testid="collection-item" border="solid 1px" borderColor="heds.100" rounded={'md'} px={3} pt={3} pb={2} bg="heds.bg2">
      <Link to={`/tape/${item.id}`}>
        <AspectRatio ratio={1}>
          <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={hasImageLoaded} fitContent rounded={'md'}>
            <Image onLoad={setHasImageLoaded.on} border="solid 1px" borderColor="heds.100" rounded={'md'} src={item.image} />
          </Skeleton>
        </AspectRatio>
      </Link>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text letterSpacing={'wide'} fontWeight={'medium'} fontFamily={'inter'} mt={2} color="white" fontSize={'sm'}>
          {item.name}
        </Text>
        <Text letterSpacing={'wide'} fontWeight={'bold'} fontFamily={'inter'} mt={2} color="heds.200" fontSize={'xs'}>
          {item.quantity}
        </Text>
      </Flex>
    </Box>
  );
};
