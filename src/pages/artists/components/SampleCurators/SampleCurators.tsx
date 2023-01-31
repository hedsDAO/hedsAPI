import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
import { CuratorCard } from '@/common/media';
import { User } from '@/models/common';

const SampleCurators = () => {
  const allCurators = useSelector(store.select.artistModel.selectAllCurators);
  return (
    <Container px={{ base: 0, lg: 4 }} mx="auto" minW="7xl" pb={5}>
      <Box minW="7xl" mb={5}>
        <Heading
          px={{ base: 4, lg: 0 }}
          className="animate__animated animate__fadeIn"
          fontWeight={'semibold'}
          letterSpacing={'widest'}
          size={['sm', 'md']}
          color={'gray.900'}
        >
          SAMPLE CURATORS
        </Heading>
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
