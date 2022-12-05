import { UserCollectionItem } from '@/models/common';
import { Divider, Skeleton, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CollectionCard = ({ item, loading }: { item: UserCollectionItem; loading: boolean }) => {
  return (
    <Stack
      as={Link}
      to={`/listen/${item.space}/${item.tape}/${item.id}`}
      bg="whiteAlpha.100"
      divider={<Divider />}
      border={'1px'}
      borderColor={'gray.300'}
      rounded="lg"
      p={2}
      shadow="sm"
    >
      <Skeleton w="full" h="fit-content" rounded="lg" isLoaded={!loading} fadeDuration={1}>
        <div className="relative">
          <img src={item?.image} className="object-cover aspect-square rounded-lg object-center shadow-md" />
          <div className="text-xs absolute top-2 right-0 py-0.5 px-2 bg-white bg-opacity-70 rounded-l-lg">x{item.quantity}</div>
        </div>
      </Skeleton>
      <Skeleton mt={1} rounded="lg" h="25px" isLoaded={!loading} fadeDuration={1}>
        <span className="px-1 tracking-tight text-xs text-gray-600 font-medium">{item.name}</span>
      </Skeleton>
    </Stack>
  );
};

export default CollectionCard;
