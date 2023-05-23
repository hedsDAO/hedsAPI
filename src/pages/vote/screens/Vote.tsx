import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Component
import { Box, Divider } from '@chakra-ui/react';
import { Header } from '@/pages/song/components/Header/Header';
import { Waveform } from '@pages/song/components/Waveform/Waveform';
import { TapeInfo } from '@/pages/vote/components/TapeInfo/TapeInfo';
import { SubmissionResultContainer } from '@/pages/vote/components/SubmissionResultContainer/SubmissionResultContainer';

import * as styles from '@pages/vote/screens/styles';

// Utils
import { Dispatch, store } from '@/store';

export const Vote = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<Dispatch>();
  const song = useSelector(store.select.songModel.selectSong);
  const proposalId = useSelector(store.select.tapeModel.selectTapeProposalId);

  // useEffect(() => {
  //   const retrieveProposalData = async () => {
  //     await dispatch.tapeModel.getTape(id);

  //     await dispatch.voteModel.getProposalById(proposalId);
  //   };

  //   retrieveProposalData();
  // }, [id, proposalId]);

  useEffect(() => {
    dispatch.tapeModel.getTape(id);
  }, [id]);

  useEffect(() => {
    if (proposalId) {
      dispatch.voteModel.getProposalById(proposalId);
    }
  }, [proposalId]);

  return (
    <Box>
      <Header />
      {song && <Waveform />}
      <Divider {...styles.$dividerStyles} />
      <TapeInfo />
      <SubmissionResultContainer />
    </Box>
  );
};
