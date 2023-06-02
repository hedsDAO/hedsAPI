import { Text } from '@chakra-ui/react';
import { $closeButtonStyles } from '@/components/GlobalAudio/components/CloseButton/styles';

/**
 * @function CloseButton
 * @param {Function} handleClose - The function to be called when the close button is clicked.
 * @description A close button component that triggers the handleClose function when clicked.
 * @returns {JSX.Element} - Rendered CloseButton component.
 */

export const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return <Text data-testid="ga-close-button" onClick={handleClose} {...$closeButtonStyles} />;
};
