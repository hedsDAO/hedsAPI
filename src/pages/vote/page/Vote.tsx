import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VoteLanding } from './VoteLanding';
import { TapeDetails } from './TapeDetails';
import { Box } from '@chakra-ui/react';

export const Vote = () => {
  const { space, tape, id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [space, tape, id]);
  return <Box minH="100vh">{space && tape && id ? <TapeDetails /> : <VoteLanding />}</Box>;
};
