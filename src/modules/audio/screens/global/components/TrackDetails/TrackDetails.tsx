import { store } from '@/store';
import { Center, Flex, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const TrackDetails = () => {
  const { artist, cover, tape, track } = useSelector(store.select.audioModel.selectActiveTrack);
  return (
    <Flex px={4} h="full" alignItems={'center'} justifyContent={'start'}>
      <Center w={{ base: '50px', md: '60px' }}>
        <Image
          shadow="lg"
          my="auto"
          maxW={{ base: '50px', md: '60px' }}
          minH={{ base: '50px', md: '60px' }}
          maxH={{ base: '50px', md: '60px' }}
          minW={{ base: '50px', md: '60px' }}
          rounded="md"
          src={cover}
          objectFit="cover"
        />
      </Center>
      <Flex w="full" justifySelf={'start'} className="-space-y-1" px={3} direction={'column'} gap={0.5}>
        <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={{base: 'sm', md:"md"}} fontWeight={'bold'}>
          {track}
        </Text>
        <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={{base: 'xs', md:'sm'}} fontWeight={'semibold'}>
          {tape}
        </Text>
        <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={{base: 'xs', md:'xs'}} fontWeight="light">
          {artist}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TrackDetails;
