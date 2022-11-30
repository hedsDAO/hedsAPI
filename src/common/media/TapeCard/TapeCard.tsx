import { UserCollectionItem } from '@/models/common';
import { Divider, Skeleton, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const TapeCard = ({ item, loading }: { item: UserCollectionItem; loading: boolean }) => {
  const { toggleColorMode } = useColorMode();
  const color = useColorModeValue('white', 'gray.800');
  const generateUrl = (str: string) => 'http://localhost:8090/listen/heds/' + str.split(' ')[0].toLowerCase() + `/${Math.floor(+str.split(' ')[1])}`;
  return (
    <Stack divider={<Divider />} border={'1px'} borderColor={color} rounded="lg" p={2} shadow="md">
      <Skeleton w="full" h="fit-content" rounded="lg" isLoaded={!loading} fadeDuration={1}>
        <div className="relative">
          <a href={generateUrl(item.name)}>
            <img src={item?.image} className="object-cover aspect-square rounded-lg object-center shadow-md" />
          </a>
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
