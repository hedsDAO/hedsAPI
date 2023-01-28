import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { VoteLanding } from './OldVoteLanding';
import { TapeDetails } from './TapeDetails';

export const Vote = () => {
  const { space, tape, id } = useParams();
  return <Fragment>{space && tape && id ? <TapeDetails /> : <VoteLanding />}</Fragment>;
};
