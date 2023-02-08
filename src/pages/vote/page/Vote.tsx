import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { VoteLanding } from './VoteLanding';
import { TapeDetails } from './TapeDetails';

import { NewTapeDetails } from './NewTapeDetails';

export const Vote = () => {
  const { space, tape, id } = useParams();
  return <Fragment>{space && tape && id ? <NewTapeDetails /> : <VoteLanding />}</Fragment>;
};
