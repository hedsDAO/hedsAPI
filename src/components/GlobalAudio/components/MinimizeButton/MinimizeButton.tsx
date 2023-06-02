import { Button, Text } from '@chakra-ui/react';
import { $minimizeButtonStyles } from './styles';

/**
 * @function MinimizeButton
 * @param {Function} handleMinimize - The function to be called when the minimize button is clicked.
 * @description A close button component that triggers the handleMinimize function when clicked.
 * @returns {JSX.Element} - Rendered MinimizeButton component.
 */

export const MinimizeButton = ({ handleMinimize }: { handleMinimize: () => void }) => {
  return <Text {...$minimizeButtonStyles} onClick={() => handleMinimize()}></Text>;
};
