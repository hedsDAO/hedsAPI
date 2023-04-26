import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import { DescriptionCharCount } from '@/modals/screens/settings/components/DescriptionCharCount/DescriptionCharCount';
import { SAVE_BUTTON_TEXT } from '@/modals/screens/settings/models/constants';
import * as styles from '@/modals/screens/settings/components/ButtonGroup/styles';

/**
 * @function ButtonGroup
 * @description Renders a group of buttons for settings actions such as saving, resetting, and clearing changes.
 * @returns {JSX.Element} - Rendered component.
 **/

export const ButtonGroup = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentUserData = useSelector(store.select.authModel.selectUser);
  const newUserData = useSelector(store.select.settingsModel.selectUserData);
  const settingsState = useSelector(store.select.settingsModel.selectState);
  const isLoading = useSelector(store.select.settingsModel.selectIsLoading);

  return (
    <Flex {...styles.$flexContainerStyles}>
      <DescriptionCharCount />
      <Flex {...styles.$buttonsFlexStyles}>
        <Button
          data-testid="submit-button"
          onClick={() => dispatch.settingsModel.handleSubmit([settingsState, currentUserData])}
          {...styles.$saveButtonStyles(isLoading, JSON.stringify(currentUserData) === JSON.stringify(newUserData) || isLoading)}
        >
          {isLoading ? <Spinner {...styles.$spinnerSize} /> : SAVE_BUTTON_TEXT}
        </Button>
        <Button
        data-testid="reset-button"
          onClick={() => {
            dispatch.settingsModel.clearState();
            dispatch.settingsModel.setUserData(currentUserData);
          }}
          {...styles.$resetButtonStyles(JSON.stringify(currentUserData) === JSON.stringify(newUserData))}
        >
          <i className={styles.$refreshIcon} />
        </Button>
        <Button data-testid="exit-button" onClick={() => dispatch.settingsModel.clearState()} {...styles.$clearButtonStyles}>
          <i className={styles.$exitIcon} />
        </Button>
      </Flex>
    </Flex>
  );
};
