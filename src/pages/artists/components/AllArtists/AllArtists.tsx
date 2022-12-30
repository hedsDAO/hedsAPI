import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { Container, Flex, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import { formatWallet } from '@/utils';
import { ArtistCard } from '@/common/media';
import InfiniteScroll from 'react-infinite-scroll-component';

const AllArtists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const loading = useSelector((state: RootState) => state.loading.models.artistModel);
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  const totalArtists = useSelector(store.select.artistModel.selectTotalArtists);
  const scrollDataMax = useSelector(store.select.artistModel.selectScrollDataMax);
  return (
    <Container maxW="7xl" className="mx-auto">
      <div className="mx-auto w-full px-4 lg:px-2">
        <Heading
          p={{ base: 2, lg: 6 }}
          className="animate__animated animate__fadeIn"
          fontWeight={'semibold'}
          letterSpacing={'widest'}
          size={['sm', 'lg']}
          color={'gray.900'}
        >
          ARTISTS
        </Heading>
      </div>
      <InfiniteScroll
        dataLength={scrollDataMax}
        next={() => dispatch.artistModel.setScrollDataMax(scrollDataMax)}
        hasMore={scrollDataMax < totalArtists}
        loader={<h4></h4>}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 px-3">
          {allArtists?.length &&
            allArtists.slice(0, scrollDataMax).map((artist) => {
              return <ArtistCard artist={artist} key={artist.wallet + artist.banner} />;
            })}
        </div>
      </InfiniteScroll>
    </Container>
  );
};

export default AllArtists;
