import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
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
        {/* <Flex alignItems={'center'} gap={3}>
          <Text fontWeight={'bold'} fontSize="22px" fontFamily={'karla'} color="heds.bg">
            RVSP
          </Text>
          <Tooltip label="RSVP" fontSize="xs" fontFamily="space">
            <Box href={'https://partiful.com/e/lRwwTBm5OE1NqH7aHLAk'} target="_blank" as={'a'} {...styles.$promoIconButtonStyles}>
              <i className={constants.TICKET_ICON} />
            </Box>
          </Tooltip>
        </Flex> */}
        {/* TAPE ICONS */}
        <Tooltip label="View Curator" fontSize="xs" fontFamily="space">
          <Box to={`/u/${constants.ARTIST_WALLET}`} as={Link} {...styles.$iconButtonStyles}>
            <i className={constants.ARTISTS_ICON} />
          </Box>
        </Tooltip>
        <Tooltip label="View Tape" fontSize="xs" fontFamily="space">
          <Box to={`/tape/17`} as={Link} {...styles.$iconButtonStyles}>
            <i className={constants.TAPES_ICON}></i>
          </Box>
        </Tooltip>
        <Tooltip label="View on Sound.xyz" fontSize="xs" fontFamily="space">
          <Box as={'a'} href={"https://www.sound.xyz/heds/sample-for-hedstape-15-featuring-lnrz"} {...styles.$iconButtonStyles}>
            <i className={constants.SOUND_ICON}></i>
          </Box>
        </Tooltip>
        {/* <Tooltip label="Play" fontSize="xs" fontFamily="space">
          <Box to={`/song/QmV3B2qXnDchtAv6exot8HbX6iFhBi4uwrYPpVXAYYh5kG`} as={Link} {...styles.$iconButtonStyles}>
            <i className={constants.PLAY_ICON}></i>
          </Box>
        </Tooltip> */}
      </Flex>
    </Box>
  );
};
