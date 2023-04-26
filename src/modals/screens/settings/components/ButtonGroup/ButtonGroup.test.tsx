import { ButtonGroup } from '@/modals/screens/settings/components/ButtonGroup/ButtonGroup';
import { store } from '@/store';
import { user } from '@/tests/mocks/data/user';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { screen, act } from '@testing-library/react';

describe('ButtonGroup unit', () => {
  beforeEach(() => {
    store.dispatch.settingsModel.setUserData(user);
    store.dispatch.settingsModel.setDescriptionError('');
    renderWithRematchStore(<ButtonGroup />, store);
  });

  it('renders all three (submit, reset, exit) buttons', () => {
    const submitButton = screen.getByTestId('submit-button');
    const resetButton = screen.getByTestId('reset-button');
    const exitButton = screen.getByTestId('exit-button');
    expect(submitButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(exitButton).toBeInTheDocument();
  });
  it('enables the submit button when the user data is different than the updated user data', async () => {
    const submitButton = screen.getByTestId('submit-button');
    act(() => {
      store.dispatch.settingsModel.setUserData(user);
      store.dispatch.authModel.setUser(user);
    });
    expect(submitButton).toBeDisabled();
  });
  it('resets the user data when the reset button is clicked', () => {
    const resetButton = screen.getByTestId('reset-button');
    act(() => {
      resetButton.click();
    });
    expect(store.getState().settingsModel.userData).toEqual(user);
  });
  it('clears the settings state when the exit button is clicked', () => {
    const exitButton = screen.getByTestId('exit-button');
    act(() => {
      exitButton.click();
    });
    expect(store.getState().settingsModel).toEqual({});
  });
});
