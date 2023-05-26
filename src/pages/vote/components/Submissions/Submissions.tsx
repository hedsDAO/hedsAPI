import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Skeleton } from '@chakra-ui/react';
import { Submission } from '@/pages/vote/components/Submission/Submission';
import { ChoiceWithScore } from '@/pages/vote/models/voteModel';
import { Song } from '@models/common';
import { Dispatch, store } from '@/store';
import * as styles from '@/pages/vote/components/Submissions/styles';

export const Submissions = ({ choices }: { choices: ChoiceWithScore[][] }) => {
  const [tracks, selected, submissions] = choices;
  const songs = useSelector(store.select.tapeModel.selectSongs);
  const isLoading = useSelector(store.select.voteModel.selectIsLoading);

  const dispatch = useDispatch<Dispatch>();

  const songsByIpfsHash = useMemo(() => {
    return songs.reduce((acc, track) => {
      acc[track.audio] = track;
      return acc;
    }, {} as { [key: string]: Song });
  }, [songs]);

  const handlePlaySubmission = (id: string) => {
    const song = songsByIpfsHash[id];
    dispatch.songModel.setSong(song);
  };

  useEffect(() => {
    const firstTrackIpfs = tracks[0].media;
    const firstSong = songsByIpfsHash[firstTrackIpfs];
    dispatch.songModel.setSong(firstSong);
  }, []);

  return (
    <Skeleton isLoaded={!isLoading}>
      <Grid {...styles.$submissionsGridStyles}>
        {tracks.map((choice) => (
          <Submission
            key={choice.name + choice.image}
            {...choice}
            $submissionType={'track'}
            handlePlaySubmission={handlePlaySubmission}
            isSongPublic={songsByIpfsHash?.[choice.media]?.public}
          />
        ))}
        {selected.map((choice) => (
          <Submission
            key={choice.name + choice.image}
            {...choice}
            $submissionType={'selected'}
            handlePlaySubmission={handlePlaySubmission}
            isSongPublic={songsByIpfsHash?.[choice.media]?.public}
          />
        ))}
        {submissions.map((choice) => (
          <Submission
            key={choice.name + choice.image}
            {...choice}
            $submissionType={'submission'}
            handlePlaySubmission={handlePlaySubmission}
            isSongPublic={songsByIpfsHash?.[choice.media]?.public}
          />
        ))}
      </Grid>
    </Skeleton>
  );
};
