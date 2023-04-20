import { store } from '@/store';
import { Flex, Stack, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const Spotlight = () => {
  const spotlight = useSelector(store.select.userModel.selectSpotlight);
  return (
    <Flex alignItems={'center'} gap={10} p={5}>
      <Image border="solid 1px" borderColor="heds.100" shadow={'md'} rounded="lg" maxW="13vw" objectFit={'cover'} src={spotlight?.cover} />
      <Stack>
        <Text fontSize={'sm'} fontFamily="karla" fontWeight={'bold'} opacity="40%" color="white">
          TRACK
        </Text>
        <Text letterSpacing={'wide'} fontFamily={'inter'} mt={'0 !important'} color="white" fontSize="xl">
          {spotlight?.submission_data?.sub_id}
        </Text>
        <Text pt={2} fontSize={'sm'} fontFamily="karla" fontWeight={'bold'} opacity="40%" color="white">
          ARTIST
        </Text>
        <Text letterSpacing={'wide'} fontFamily={'inter'} mt={'0 !important'} color="white" fontSize="xl">
          {spotlight?.artists.map((e: any) => e.display_name)}
        </Text>
      </Stack>
    </Flex>
  );
};
