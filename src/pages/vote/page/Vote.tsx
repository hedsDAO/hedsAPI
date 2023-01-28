import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import VoteLandingMock from './VoteLandingMock';
import { TapeDetails } from './TapeDetails';

export const Vote = () => {
  const { space, tape, id } = useParams();
  return <Fragment>{space && tape && id ? <TapeDetails /> : <VoteLandingMock />}</Fragment>;
};
