import { UserCollectionItem } from '@/models/common';
import { Center, Divider, Image, Skeleton, Stack, useBoolean, Tag, Text, TagLabel } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CollectionCard = ({ item, tapeVp, loading }: { item: UserCollectionItem; tapeVp: number; loading: boolean }) => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  return (
    <Stack
      as={Link}
      className="group transition-all ease-in-out bs-preset-1"
      to={`/listen/${item.space}/${item.tape}/${item.id}`}
      bg="gray.50"
      _hover={{ bg: 'white', borderColor: 'gray.800' }}
      divider={<Divider />}
      border={'1px'}
      borderColor={'gray.700'}
      rounded="sm"
      p={3}
    >
      <Skeleton startColor="gray.100" endColor="gray.500" w="full" minH="11rem" rounded="lg" isLoaded={isImageLoaded && !loading}>
        <div className="relative mb-2">
          <img
            onLoad={setIsImageLoaded.on}
            loading="eager"
            src={item?.image}
            className="group-hover:saturate-[50%] ease-in-out transition-all object-cover aspect-square rounded-md object-center shadow-md outline-neutral-900 outline-1 outline"
          />
          {item && (
            <div className="text-xs absolute top-2 right-0 py-0.5 px-2 bg-white bg-opacity-80 rounded-l-lg outline-neutral-900 outline-1 outline">
              x{item.quantity}
            </div>
          )}
        </div>
        <span className="mx-1 font-semibold text-xs font-serif tracking-wide group-hover:text-gray-900 text-gray-600">{item.name}</span>
        {tapeVp > 0 && 
        <Tag mt="1" size='sm' borderRadius='full'>
          <Text mr="1" color="green"> {tapeVp} </Text>
            <TagLabel>HED</TagLabel>
        </Tag>}
      </Skeleton>
    </Stack>
  );
};

export default CollectionCard;
