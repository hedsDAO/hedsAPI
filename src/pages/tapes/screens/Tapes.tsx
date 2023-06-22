import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tape } from '@/models/common';
import { Dispatch, store } from '@/store';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { Metatags, MetatagTypes } from '@/common/utilities/Metatags';
import { TapeCard } from '../components/TapeCard/TapeCard';

export const Tapes = () => {
  const dispatch = useDispatch<Dispatch>();
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);
  useEffect(() => {
    dispatch.tapesModel.getTapes();
  }, []);
  return (
    <Metatags type={MetatagTypes.TAPES}>
      <Box pt={2} px={5} mx="auto">
        <SimpleGrid columns={{ base: 2, lg: 5 }} spacing={2}>
          {allTapes?.length &&
            allTapes.map((tape: Tape) => {
              return <TapeCard key={tape.id + 'tapes'} tape={tape} />;
            })}
        </SimpleGrid>
      </Box>
    </Metatags>
  );
};
