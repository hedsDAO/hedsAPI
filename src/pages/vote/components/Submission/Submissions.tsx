import { useSelector } from 'react-redux';
import { Box, Flex, Grid, Image, Progress, Stack, Skeleton, Text } from '@chakra-ui/react';
import { ChoiceWithScore } from '@/pages/vote/models/voteModel';
import { store } from '@/store';
import * as styles from '@/pages/vote/components/Submission/styles';

export const Submissions = ({ choices }: { choices: ChoiceWithScore[][] }) => {
  const [tracks, selected, submissions] = choices;
  const isLoading = useSelector(store.select.voteModel.selectIsLoading);
  return (
    <Skeleton isLoaded={!isLoading}>
      <Grid {...styles.$submissionsGridStyles}>
        {tracks.map((choice) => (
          <Submission key={choice.name + choice.image} {...choice} $submissionType={'track'} />
        ))}
        {selected.map((choice) => (
          <Submission key={choice.name + choice.image} {...choice} $submissionType={'selected'} />
        ))}
        {submissions.map((choice) => (
          <Submission key={choice.name + choice.image} {...choice} $submissionType={'submission'} />
        ))}
      </Grid>
    </Skeleton>
  );
};

interface OwnProps extends ChoiceWithScore {
  $submissionType: string;
}

const Submission = (props: OwnProps) => {
  const { image, name, artist, score, $submissionType } = props;
  return (
    <Box {...styles.$submissionBoxStyles($submissionType)}>
      <Stack {...styles.$cardStackStyles}>
        <Box {...styles.$cardImageBoxStyles}>
          <Image {...styles.$cardImageStyles} src={image} alt="Submission Image" />
        </Box>
        <Flex {...styles.$cardFlexStyles}>
          <Text {...styles.$cardTextStyles.name}>{name}</Text>
          <Flex {...styles.$cardInnerFlexStyles}>
            <Text {...styles.$cardTextStyles.artist}>{artist}</Text>
            <Text {...styles.$cardTextStyles.score}>{+score.toFixed(2)}%</Text>
          </Flex>
          <Progress value={score} {...styles.$cardProgressStyles} />
        </Flex>
      </Stack>
    </Box>
  );
};
