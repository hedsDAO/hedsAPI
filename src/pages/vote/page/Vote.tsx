import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { VoteLanding, VoteResults } from '../screens';

import Voting from '../screens/Voting';

export const Vote = () => {
  const { space, tape, id } = useParams();
  return <Fragment>{space && tape && id ? <VoteResults /> : <VoteLanding />}</Fragment>;
};
