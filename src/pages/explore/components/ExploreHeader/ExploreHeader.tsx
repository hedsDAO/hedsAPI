import { Stack, Text } from '@chakra-ui/react';
import * as constants from '@/pages/explore/models/constants';
import * as styles from '@/pages/explore/components/ExploreHeader/styles';

/**
 * @function ExploreHeader
 * @description Renders the title and description for the Explore page.
 * @returns {JSX.Element} - Rendered ExploreHeader component.
 **/

export const ExploreHeader = () => {
  return (
    <Stack {...styles.$exploreHeaderStackStyles}>
      <Text {...styles.$exploreHeaderTextStyles}>{constants.EXPLORE_HEADER_TEXT}</Text>
      <Text {...styles.$exploreHeaderDescriptionTextStyles}>{constants.EXPLORE_HEADER_DESCRIPTION_TEXT}</Text>
    </Stack>
  );
};
