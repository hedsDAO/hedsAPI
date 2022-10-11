import { RootState } from '@/store';
import { Center, Flex, Image, Text } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';

const TrackDetails = () => {
  const audioData = useSelector((state: RootState) => state.audioModel);
  return (
    <Flex px={2} alignItems={'center'} justifyContent={'start'} height="60%" bg="gray.300" w="full">
      <Center w="2.5rem">
        <Image my="auto" maxW="2.5rem" minH="2.5rem" maxH="2.5rem" minW="2.5rem" rounded="lg" src={audioData?.tapes?.[0]?.image} objectFit="cover" />
      </Center>
      <Marquee className="ml-2" gradient={false}>
        <Flex px={3} direction={'row'} alignItems="baseline" gap={1}>
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
  );
};

export default TrackDetails;
