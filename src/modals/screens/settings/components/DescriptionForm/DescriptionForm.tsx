import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Stack, FormControl, FormLabel, FormHelperText, Textarea } from '@chakra-ui/react';
import { UPDATE_DESCRIPTION_TEXT, DESCRIPTION_TITLE } from '@/modals/screens/settings/models/constants';
import * as styles from '@/modals/screens/settings/components/DescriptionForm/styles';
/**
 * @component DescriptionForm
 * @description Displays a form to update the user's profile description.
 * @returns {JSX.Element} - Rendered DescriptionForm component.
 */
export const DescriptionForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const description = useSelector(store.select.userModel.selectDescription);
  const newDescription = useSelector(store.select.settingsModel.selectDescription);
  const descriptionError = useSelector(store.select.settingsModel.selectDescriptionError);
  
  return (
    <Stack {...styles.$stackContainerStyles}>
      <FormControl {...styles.$formControlStyles}>
        <FormLabel {...styles.$formLabelStyles}>{DESCRIPTION_TITLE}</FormLabel>
        <FormHelperText {...styles.$formHelperTextStyles}>{UPDATE_DESCRIPTION_TEXT}</FormHelperText>
        <Textarea
          data-testid="description-input"
          onChange={(e) => dispatch.settingsModel.handleDescriptionChange(e.target.value)}
          {...styles.$textareaStyles(descriptionError, newDescription, description)}
        />
      </FormControl>
    </Stack>
  );
};
