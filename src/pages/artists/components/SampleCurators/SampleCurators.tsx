import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Divider, Flex, Heading, HStack, Image, Skeleton, Text } from '@chakra-ui/react';
import { formatWallet } from '@/utils';
import Marquee from 'react-fast-marquee';
import { CuratorCard } from '@/common/media';
import { User } from '@/models/common';

const SampleCurators = () => {
  const loading = useSelector((state: RootState) => state.loading.models.artistModel);
  const allCurators = useSelector(store.select.artistModel.selectAllCurators);
  const navigate = useNavigate();
  return (
    <Container className="mx-auto min-w-[100vw] pb-5">
      <Box mb={5}>
        <Container py={{ base: '4', md: '8' }}>
          <HStack>
            <Divider borderColor="gray.700" w="full" />
            <Text fontSize="lg" fontWeight="semibold" whiteSpace="nowrap" letterSpacing={'widest'}>
              SAMPLE CURATORS
            </Text>
            <Divider borderColor="gray.700" w="full" />
          </HStack>
        </Container>
      </Box>
      <Marquee gradient={false}>
        {allCurators?.length &&
          allCurators.map((curator: User) => {
            return <CuratorCard curator={curator} key={curator.wallet + curator.banner} />;
          })}
      </Marquee>
    </Container>
  );
};

export default SampleCurators;
