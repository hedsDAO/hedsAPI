import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { Dispatch, store } from '@/store';

// Components
import { Box, Flex, Text } from '@chakra-ui/react';
import { Submissions } from '@/pages/vote/components/Submissions/Submissions';
import { VoterResults } from '@/pages/vote/components/VoterResults/VoterResults';
import { CastVoteContainer } from '@/pages/vote/components/CastVoteContainer/CastVoteContainer';
import { OpenVoteCards } from '@/pages/vote/components/OpenVoteCard/OpenVoteCard';
import { Song } from '@models/common';
// import { QuadraticVoting } from './utils';
// import { quadratic} from 'hedsvote';

export const SubmissionResultContainer = () => {
  const dispatch = useDispatch<Dispatch>();

  const [voterChoices, setVoterChoices] = useState({});
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  const cycle = useSelector(store.select.tapeModel.selectCurrentCycle);
  const choices = useSelector(store.select.voteModel.selectChoices);
  const scores = useSelector(store.select.voteModel.selectScores);
  const votes = useSelector(store.select.voteModel.selectVotes);
  const sortedChoicesByResults = useSelector(store.select.voteModel.selectSortedChoicesByResults({ choices, scores, tracks }));
  const songs = useSelector(store.select.tapeModel.selectSongs);
  const sample = useSelector(store.select.tapeModel.selectCurrentTapeSample);
  const { handlePlayPause } = useAudio();
  // const strategies = useSelector(store.select.voteModel.selectStrategies);

  // useEffect(() => {
  //   if (choices && votes && strategies) {
  //     const quadraticVoting = quadratic({
  //       choices,
  //       votes,
  //     });

  //     console.log("choices:", choices)
  //     console.log('scores', scores);
  //     console.log('scores from quadratic', quadraticVoting.getScores());
  //   }
  // }, [choices, votes, strategies]);

  const handleVoterChoices = (votesObj: { [key: number]: number }) => {
    setVoterChoices(votesObj);
  };

  const songsByIpfsHash = useMemo(() => {
    return songs.reduce((acc, track) => {
      acc[track.audio] = track;
      return acc;
    }, {} as { [key: string]: Song });
  }, [songs]);

  const handleSelectedSubmission = (id: string) => {
    const song = songsByIpfsHash[id];
    handlePlayPause(song);
    dispatch.songModel.setSong(song);
  };

  useEffect(() => {
    dispatch.songModel.setSong(sample);
  }, [sample]);

  return (
    <Flex direction={['column', 'row']} justifyContent="space-around" mt={{ lg: 4 }} px={{ base: 12, lg: 16 }}>
      <Box w={['100%', '70%']} mb={8}>
        <Text color="white" fontFamily="poppins" fontSize="lg" letterSpacing="wider">
          SUBMISSIONS
        </Text>
        <Text color="white" fontFamily="space" fontSize="sm" pb={1.5}>
          Listen to the submissions for this tape
        </Text>
        {cycle === 'vote'
          ? choices?.length && <OpenVoteCards choices={choices} handleSelectedSubmission={handleSelectedSubmission} />
          : sortedChoicesByResults?.length && (
              <Submissions choices={sortedChoicesByResults} voterChoices={voterChoices} handleSelectedSubmission={handleSelectedSubmission} />
            )}
      </Box>

      <Box width={['100', '20%']}>
        {cycle === 'vote' ? (
          <CastVoteContainer />
        ) : (
          <>
            <Text color="white" fontFamily="poppins" fontSize="lg" letterSpacing="wider">
              RESULTS
            </Text>
            <Text color="white" fontFamily="inter" fontSize="sm">
              Voting has been closed and here are the results
            </Text>
            {votes?.length > 0 && <VoterResults handleVoterChoices={handleVoterChoices} />}
          </>
        )}
      </Box>
    </Flex>
  );
};
