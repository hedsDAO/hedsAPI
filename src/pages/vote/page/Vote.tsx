import { Fragment, useEffect } from 'react';
import { Dispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { VoteLanding, VoteResults } from '../screens';

export const Vote = () => {
  const { space, tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.voteModel.getAllProposals();
  }, []);

  return <Fragment>{space && tape && id ? <VoteResults /> : <VoteLanding />}</Fragment>;
};
