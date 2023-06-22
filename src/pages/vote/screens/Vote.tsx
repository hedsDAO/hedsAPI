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
import { Metatags, MetatagTypes } from '@/common/utilities/Metatags';

export const Vote = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<Dispatch>();
  const song = useSelector(store.select.songModel.selectSong);
  const proposalId = useSelector(store.select.tapeModel.selectTapeProposalId);
  const vote = useSelector(store.select.voteModel.selectCurrentVote);

  useEffect(() => {
    const retrieveProposalData = async () => {
      await dispatch.tapeModel.getTape(id);
      if (proposalId) {
        await dispatch.voteModel.getProposalById(proposalId);
      }
    };

    retrieveProposalData();
  }, [id, proposalId]);

  return (
    <>
      {vote ? (
        <Metatags vote={vote} type={MetatagTypes.VOTE}>
          <Box>
            <Header />
            {song && <Waveform />}
            <Divider {...styles.$dividerStyles} />
            <TapeInfo />
            <SubmissionResultContainer />
          </Box>
        </Metatags>
      ) : (
        <></>
      )}
    </>
  );
};
