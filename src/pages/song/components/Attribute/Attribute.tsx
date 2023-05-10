import { Box, Text } from '@chakra-ui/react';
import * as styles from '@pages/song/components/Attribute/styles';

/**
 * @function Attribute
 * @description Renders an attribute component with a name and description to display cyanite data.
 * @param {string} name - Attribute name.
 * @param {string} description - Attribute description.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Attribute = ({ name, description }: { name?: string; description?: string }) => {
  return (
    <Box {...styles.$attributeBoxStyles(name)}>
      <Text {...styles.$attributeNameTextStyles}>{name}</Text>
      <Text {...styles.$attributeDescriptionTextStyles}>{description}</Text>
    </Box>
  );
};
