import { RootState } from '@/store';
import { Center, Flex, Image, Text } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';
import PlayerButtons from '../PlayerButtons/PlayerButtons';

const TrackDetails = () => {
  const audioData = useSelector((state: RootState) => state.audioModel);
  return (
    <Flex px={2} alignItems={'center'} justifyContent={'start'} height="100%" bg="gray.200" w="full">
      <Center w="5rem">
        <Image my="auto" maxW="5rem" minH="5rem" maxH="5rem" minW="5rem" rounded="lg" src={audioData?.tapes?.[0]?.image} objectFit="cover" />
      </Center>
      <Flex alignItems={'center'} justifyContent={'center'} direction={'column'}>
        <Marquee className="ml-2" gradient={false}>
          <Flex px={3} direction={'row'} alignItems="baseline" gap={2}>
            <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize="md" fontWeight={'bold'}>
              {audioData?.queue?.[0].track}
            </Text>
            <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={'sm'} fontWeight={'semibold'}>
              {audioData?.tapes?.[0]?.name}
            </Text>
            <Text py={1} whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={'xs'} fontWeight="light">
              {audioData?.artists?.[0]?.displayName}
            </Text>
          </Flex>
        </Marquee>
      </Flex>
      <Flex bg="gray.200" w="full" gap={2} textAlign="center" justifyContent="center" alignItems={'center'}>
          <i className="fa-sharp fa-solid fa-backward-step"></i>
          <i className="fa-sharp fa-solid fa-play"></i>
          <i className="fa-sharp fa-solid fa-forward-step"></i>
        </Flex>
    </Flex>
  );
};

export default TrackDetails;
