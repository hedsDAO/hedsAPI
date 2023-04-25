import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Box, Fade, Flex, Text } from '@chakra-ui/react';
import { MAX_CHAR_COUNT } from '@/modals/screens/settings/models/constants';
import * as styles from '@/modals/screens/settings/components/DescriptionCharCount/styles';

/**
 * @function DescriptionCharCount
 * @description Displays the character count of the description input and shows errors if applicable.
 * @returns {JSX.Element} - Rendered component.
 **/

export const DescriptionCharCount = () => {
  const description = useSelector(store.select.userModel.selectDescription);
  const descCharacters = useSelector(store.select.settingsModel.selectDescCharacters);
  const descriptionError = useSelector(store.select.settingsModel.selectDescriptionError);
  return (
    <Flex>
      <Fade in={descriptionError?.length > 0}>
        <Box {...styles.$errorBoxStyles(descriptionError)}>
          <Text {...styles.$errorTextStyles(descriptionError)}>{descriptionError}</Text>
        </Box>
      </Fade>
      <Fade in={descriptionError?.length === 0 || !descriptionError}>
        <Flex>
          <Text {...styles.$charCountTextStyles(descriptionError)}> {descCharacters || description.length} </Text>
          <Text {...styles.$slashTextStyles(descriptionError)}> / </Text>
          <Text {...styles.$maxCharTextStyles(descriptionError)}> {MAX_CHAR_COUNT} </Text>
        </Flex>
      </Fade>
    </Flex>
  );
};
