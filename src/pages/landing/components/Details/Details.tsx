import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import * as constants from '@/pages/landing/models/constants';
import * as styles from '@/pages/landing/components/Details/styles';

/**
 * @function Details
 * @description Renders the artist and tape names for the Landing page.
 * @returns {JSX.Element} - Rendered Details component.
 **/

export const Details = () => {
  return (
    <Box {...styles.$detailsBoxStyles}>
      <Flex {...styles.$detailsFlexStyles}>
        <Box {...styles.$detailsVerticalLineBoxStyles} />
        <VStack {...styles.$detailsVStackStyles}>
          <Text {...styles.$detailsPresentsTextStyles}>{constants.HEDS_PRESENTS_TEXT}</Text>
          <Text {...styles.$detailsArtistNameTextStyles}>{constants.ARTIST_NAME_TEXT}</Text>
          <Text {...styles.$detailsTapeNameTextStyles}>{constants.TAPE_NAME_TEXT}</Text>
        </VStack>
      </Flex>
    </Box>
  );
};
