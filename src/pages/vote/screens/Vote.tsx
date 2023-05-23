import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Component
import { Avatar, Box, Divider, Flex, Heading, Skeleton, Progress, Stack, Text, Image } from '@chakra-ui/react';
import { Header } from '@/pages/song/components/Header/Header';
import { Waveform } from '@pages/song/components/Waveform/Waveform';
import { Submissions } from '@/pages/vote/components/Submission/Submissions';
import { VoterResults } from '@/pages/vote/components/VoterResults/VoterResults';

import * as styles from '@pages/vote/screens/styles';

// Utils
import { Dispatch, store } from '@/store';

export const Vote = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<Dispatch>();
  const song = useSelector(store.select.songModel.selectSong);
  const choices = useSelector(store.select.voteModel.selectChoices);
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  const proposalId = useSelector(store.select.tapeModel.selectTapeProposalId);
  const scores = useSelector(store.select.voteModel.selectScores);
  const sortedChoicesByResults = useSelector(store.select.voteModel.selectSortedChoicesByResults({ choices, scores, tracks }));
  const votes = useSelector(store.select.voteModel.selectVotes);
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);

  useEffect(() => {
    dispatch.tapeModel.getTape(id);
  }, [id]);

  useEffect(() => {
    if (proposalId) {
      dispatch.voteModel.getProposalById(proposalId);
    }
  }, [proposalId]);

  useEffect(() => {
    console.log(votes);
  }, [votes]);

  useEffect(() => {
    console.log(sortedChoicesByResults);
  }, [sortedChoicesByResults]);

  return (
    <Box>
      <Header />
      {song && <Waveform />}
      <Divider {...styles.$dividerStyles} />
      <Flex direction="row" gap={8} justifyContent="space-around" p={12}>
        <Flex w="70%" gap={2}>
          <Stack w="35%">
            <Text fontSize="5xl" letterSpacing="wider" fontFamily="monospace" color="#9293FF">
              {tape.name}
            </Text>
            {tape.sampleArtists.map((artist) => (
              <Stack key={artist.id} {...styles.$artistStackStyles}>
                <Avatar src={artist.profile_picture} name={artist.display_name} />
                <Text {...styles.$artistNameTextStyles}>{artist.display_name}</Text>
              </Stack>
            ))}
          </Stack>
          <Stack w="45%">
            <Text color="white" fontFamily="inter" fontWeight="600" fontSize="lg">
              Description
            </Text>
            <Text color="white" fontFamily="inter" fontWeight="300" fontSize="sm">
              {tape.description}
            </Text>
          </Stack>
        </Flex>
        <Flex w="20%">
          <Stack>
            <Box border="1px" bgColor="#4F4F4F" color="#745CBA" p={8} borderRadius="md">
              <Text color="white">SAMPLE</Text>
              <Text color="white">Listen to the sample provided by the artist</Text>
            </Box>
          </Stack>
        </Flex>
      </Flex>
      <Flex direction="row" justifyContent="space-around">
        {sortedChoicesByResults.length && <Submissions choices={sortedChoicesByResults} />}
        {votes?.length > 0 && <VoterResults />}
      </Flex>
    </Box>
  );
};
