import { Box } from '@chakra-ui/react';
import { BackgroundImage } from '@/pages/landing/components/BackgroundImage/BackgroundImage';
import { Details } from '@/pages/landing/components/Details/Details';
import { IconButtons } from '@/pages/landing/components/IconButtons/IconButtons';
import { ScrollWrapper } from '@/pages/landing/components/ScrollWrapper/ScrollWrapper';
import * as styles from '@/pages/landing/screens/styles';

/**
 * @function Landing
 * @description Renders landing page with scroll logic, video, text and icon buttons.
 * @returns {JSX.Element} - Rendered Landing component.
 **/

export const Landing = () => {
  return (
    <Box {...styles.$landingBoxStyles}>
      <ScrollWrapper>
        <BackgroundImage />
        <Details />
        <IconButtons />
      </ScrollWrapper>
    </Box>
  );
};
