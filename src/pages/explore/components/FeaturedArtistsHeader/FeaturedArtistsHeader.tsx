import { Stack, Text } from '@chakra-ui/react';
import * as constants from '@/pages/explore/models/constants';
import * as styles from '@/pages/explore/components/FeaturedArtistsHeader/styles';

/**
 * @function FeaturedArtistsHeader
 * @description Renders the text and description for the feature artists section of the explore page.
 * @returns {JSX.Element} - Rendered FeaturedArtistsHeader component.
 **/

export const FeaturedArtistsHeader = () => {
  return (
    <Stack {...styles.$featuredArtistStackStyles}>
      <Text {...styles.$featuredArtistsHeaderTextStyles}>{constants.FEATURED_ARTISTS_HEADER_TEXT}</Text>
      <Text {...styles.$featuredArtistsDescriptionTextStyles}>{constants.FEATURED_ARTISTS_DESCRIPTION_TEXT}</Text>
    </Stack>
  );
};
