import { Box, Flex, Image, Progress, Stack, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { ChoiceWithScore } from '@/pages/vote/models/voteModel';
import * as constants from '@/pages/song/models/constants';

import * as styles from '@/pages/vote/components/Submission/styles';

interface OwnProps extends ChoiceWithScore {
  submissionType: string;
  selected: boolean;
  isSongPublic?: boolean;
  handlePlaySubmission: (id: string) => void;
}

export const Submission = (props: OwnProps) => {
  const { image, name, artist, score, media, handlePlaySubmission, isSongPublic, submissionType, selected } = props;

  return (
    <Box {...styles.$submissionBoxStyles(submissionType, selected)} onClick={() => handlePlaySubmission(media)}>
      <Stack {...styles.$cardStackStyles}>
        <Box {...styles.$cardImageBoxStyles}>
          <Image {...styles.$cardImageStyles} src={image} alt="Submission Image" />
        </Box>
        <Flex {...styles.$cardFlexStyles}>
          <Text {...styles.$cardTextStyles.name}>{name}</Text>
          <Flex {...styles.$cardInnerFlexStyles}>
            {isSongPublic ? (
              <Text {...styles.$cardTextStyles.artist}>{artist}</Text>
            ) : (
              <Tooltip label={constants.PRIVATE_TRACK_LABEL} hasArrow {...styles.$privateTooltipStyles}>
                <Box {...styles.$privateLabelStyles} />
              </Tooltip>
            )}
            <Text {...styles.$cardTextStyles.score}>{+score.toFixed(2)}%</Text>
          </Flex>
          <Progress value={score} {...styles.$cardProgressStyles} />
        </Flex>
      </Stack>
    </Box>
  );
};
