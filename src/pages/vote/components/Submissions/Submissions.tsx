import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Skeleton } from '@chakra-ui/react';
import { Submission } from '@/pages/vote/components/Submission/Submission';
import { ChoiceWithScore } from '@/pages/vote/models/voteModel';
import { Song } from '@models/common';
import { store } from '@/store';
import * as styles from '@/pages/vote/components/Submissions/styles';

interface OwnProps {
  choices: ChoiceWithScore[][];
  voterChoices: { [key: number]: number };
  handleSelectedSubmission: (id: string) => void;
}

export const Submissions = ({ choices, voterChoices, handleSelectedSubmission }: OwnProps) => {
  const [tracks, selected, submissions] = choices;
  const songs = useSelector(store.select.tapeModel.selectSongs);
  const isLoading = useSelector(store.select.voteModel.selectIsLoading);

  const songsByIpfsHash = useMemo(() => {
    return songs.reduce((acc, track) => {
      acc[track.audio] = track;
      return acc;
    }, {} as { [key: string]: Song });
  }, [songs]);

  return (
    <Skeleton isLoaded={!isLoading}>
      <Grid {...styles.$submissionsGridStyles}>
        {tracks.map((choice) => (
          <Submission
            key={choice.name + choice.image}
            {...choice}
            submissionType={'track'}
            handlePlaySubmission={handleSelectedSubmission}
            isSongPublic={songsByIpfsHash?.[choice.media]?.public}
            selected={!!voterChoices[choice.id]}
          />
        ))}
        {selected.map((choice) => (
          <Submission
            key={choice.name + choice.image}
            {...choice}
            submissionType={'selected'}
            handlePlaySubmission={handleSelectedSubmission}
            isSongPublic={songsByIpfsHash?.[choice.media]?.public}
            selected={!!voterChoices[choice.id]}
          />
        ))}
        {submissions.map((choice) => (
          <Submission
            key={choice.name + choice.image}
            {...choice}
            submissionType={'submission'}
            handlePlaySubmission={handleSelectedSubmission}
            isSongPublic={songsByIpfsHash?.[choice.media]?.public}
            selected={!!voterChoices[choice.id]}
          />
        ))}
      </Grid>
    </Skeleton>
  );
};
