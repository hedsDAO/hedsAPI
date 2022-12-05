import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Heading, Image, AspectRatio, Skeleton, Divider, Text, Flex, Avatar, Container } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { TapeCard } from '@/common/media';

export const Tapes = () => {
  const navigate = useNavigate();
  const hedsTapes = useSelector(store.select.tapesModel.selectAllHedsTapes);
  const { artistMapping } = useSelector((state: RootState) => state.artistModel);
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);

  return (
    <div className="">
      {allTapes && (
        <div className="mx-auto w-full px-5 lg:px-10">
          <Heading
            className="animate__animated animate__fadeInUp"
            fontWeight={'bold'}
            letterSpacing={'tight'}
            size={['xl', '2xl']}
            color={'gray.800'}
            mt={{ base: 5, lg: 10 }}
            mb={3}
            p={1}
          >
            Releases
          </Heading>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {hedsTapes && artistMapping && (
              <Fragment>
                {Object.values(hedsTapes)
                  ?.reverse()
                  ?.map((tape, index) => {
                    return <TapeCard key={tape.contract + index} tape={tape} />;
                  })}
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
