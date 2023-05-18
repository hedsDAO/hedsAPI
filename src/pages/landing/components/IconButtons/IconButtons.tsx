import { Box, Flex } from '@chakra-ui/react';
import * as constants from '@/pages/landing/models/constants';
import * as styles from '@/pages/landing/components/IconButtons/styles';
import { Link } from 'react-router-dom';

/**
 * @function IconButtons
 * @description Renders the icon buttons on the Landing page.
 * @returns {JSX.Element} - Rendered IconButtons component.
 **/

export const IconButtons = () => {
  return (
    <Box {...styles.$iconButtonsBoxStyles}>
      <Flex {...styles.$iconButtonsFlexStyles}>
        <Box to={`/u/${constants.ARTIST_WALLET}`} as={Link} {...styles.$iconButtonStyles}>
          <i className={constants.ARTISTS_ICON} />
        </Box>
        <Box to={`/t/16`} as={Link} {...styles.$iconButtonStyles}>
          <i className={constants.TAPES_ICON}></i>
        </Box>
        <Box to={`/song/sample`} as={Link} {...styles.$iconButtonStyles}>
          <i className={constants.PLAY_ICON}></i>
        </Box>
      </Flex>
    </Box>
  );
};
