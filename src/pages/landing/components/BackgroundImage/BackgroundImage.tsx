import { Image } from '@chakra-ui/react';
import * as constants from '@/pages/landing/models/constants';
import * as styles from '@/pages/landing/components/BackgroundImage/styles';

/**
 * @function BackgroundImage
 * @description Renders full size image as background for landing page.
 * @returns {JSX.Element} - Rendered BackgroundImage component.
 **/

export const BackgroundImage = () => {
  return <Image {...styles.$backgroundImageStyles} src={constants.BACKGROUND_IMAGE_URL} />;
};
