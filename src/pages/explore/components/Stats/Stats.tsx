import { SimpleGrid, GridItem, Stack, Text } from '@chakra-ui/react';
import * as constants from '@/pages/explore/models/constants';
import * as styles from '@/pages/explore/components/Stats/styles';

/**
 * @function Stats
 * @description Renders the a grid of global stats for tapes, artists, value generated and submissions.
 * @returns {JSX.Element} - Rendered Stats component.
 **/

export const Stats = () => {
  return (
    <SimpleGrid {...styles.$statsSimpleGridStyles}>
      {Object.entries(constants.EXPLORE_STATS).map(([label, value]: [string, string]) => (
        <GridItem key={label + value} {...styles.$statsGridItemStyles}>
          <Stack {...styles.$statsStackStyles}>
            <Text {...styles.$statsLabelStyles}>{label}</Text>
            <Text {...styles.$statsValueStyles}>{value}</Text>
          </Stack>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
