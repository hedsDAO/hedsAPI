import { UserCollectionItem } from '@/models/common';
import { Divider, Skeleton, Stack } from '@chakra-ui/react';
import { Fragment } from 'react';

const TapeCard = ({ item, loading }: { item: UserCollectionItem; loading: boolean }) => {
  return (
    <Stack divider={<Divider />} border={'1px'} borderColor={'gray.200'} rounded="lg" p={2} shadow="md">
      <Skeleton w="full" h="fit-content" rounded="lg" isLoaded={!loading} fadeDuration={1}>
        <div className="relative">
          <img src={item?.image} className="object-cover aspect-square rounded-lg object-center hover:opacity-75 shadow-md" />
          <div className="text-xs absolute top-2 right-0 py-0.5 px-2 bg-white bg-opacity-70 rounded-l-lg">x{item.quantity}</div>
        </div>
      </Skeleton>
      <Skeleton mt={1} rounded="lg" h="25px" isLoaded={!loading} fadeDuration={1}>
        <span className="px-1 tracking-tight text-xs text-gray-600 font-medium">{item.name}</span>
      </Skeleton>
    </Stack>
  );
};

export default TapeCard;
