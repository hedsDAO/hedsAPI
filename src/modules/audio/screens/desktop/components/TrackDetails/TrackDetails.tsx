import { RootState } from '@/store';
import { Center, Flex, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const TrackDetails = () => {
  const audioData = useSelector((state: RootState) => state.audioModel);
  return (
    <Flex px={3} h="full" alignItems={'center'} justifyContent={'start'}>
      <Center w="70px">
        <Image my="auto" maxW="70px" minH="70px" maxH="70px" minW="70px" rounded="lg" src={audioData?.queue?.[0]?.cover} objectFit="cover" />
      </Center>
      <Flex w="full" justifySelf={'start'} className="-space-y-1" px={3} direction={'column'}>
        <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize="lg" fontWeight={'bold'}>
          {audioData?.queue?.[0]?.track}
        </Text>
        <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={'sm'} fontWeight={'semibold'}>
          {audioData?.queue?.[0]?.tape}
        </Text>
        <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={'xs'} fontWeight="light">
          {audioData?.queue?.[0]?.artist}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TrackDetails;