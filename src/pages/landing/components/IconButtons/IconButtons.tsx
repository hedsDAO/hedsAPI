import { Box, Flex, Tooltip } from '@chakra-ui/react';
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
        {/* PROMO ICONS */}
        <Tooltip label="RSVP" fontSize="xs" fontFamily="space">
          <Box to={{ pathname: 'https://partiful.com/e/lRwwTBm5OE1NqH7aHLAk' }} target="_blank" as={Link} {...styles.$iconButtonStyles}>
            <i className={constants.TICKET_ICON} />
          </Box>
        </Tooltip>
        {/* TAPE ICONS */}
        {/* <Tooltip label="View Artist" fontSize="xs" fontFamily="space">
          <Box to={`/u/${constants.ARTIST_WALLET}`} as={Link} {...styles.$iconButtonStyles}>
            <i className={constants.ARTISTS_ICON} />
          </Box>
        </Tooltip>
        <Tooltip label="View Tape" fontSize="xs" fontFamily="space">
          <Box to={`/tape/16`} as={Link} {...styles.$iconButtonStyles}>
            <i className={constants.TAPES_ICON}></i>
          </Box>
        </Tooltip>
        <Tooltip label="Play" fontSize="xs" fontFamily="space">
          <Box to={`/song/QmV3B2qXnDchtAv6exot8HbX6iFhBi4uwrYPpVXAYYh5kG`} as={Link} {...styles.$iconButtonStyles}>
            <i className={constants.PLAY_ICON}></i>
          </Box>
        </Tooltip> */}
      </Flex>
    </Box>
  );
};
