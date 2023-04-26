import { DescriptionForm } from '@/modals/screens/settings/components/DescriptionForm/DescriptionForm';
import { store } from '@/store';
import { user } from '@/tests/mocks/data/user';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { screen, fireEvent } from '@testing-library/react';
import { UPDATE_DESCRIPTION_TEXT, DESCRIPTION_TITLE, MAX_CHAR_COUNT } from '@/modals/screens/settings/models/constants';

describe('DescriptionForm unit', () => {
  beforeEach(() => {
    store.dispatch.authModel.setUser(user);
    store.dispatch.settingsModel.setDescription(user?.description || '');
    store.dispatch.settingsModel.setDescCharacters(user?.description?.length || 0);
    store.dispatch.settingsModel.setDescriptionError('');
    renderWithRematchStore(<DescriptionForm />, store);
  });

  it('renders the description title', () => {
    const descriptionTitle = screen.getByText(DESCRIPTION_TITLE);
    expect(descriptionTitle).toBeInTheDocument();
  });

  it('renders the description input', () => {
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
  });

  it('displays the current user description value in the input', () => {
    const { settingsModel } = store.getState();
    const descriptionInput = screen.getByTestId('description-input') as HTMLInputElement;
    expect(descriptionInput.value).toBe(settingsModel.userData.description);
  });

  it('updates the description input value on change', () => {
    const descriptionInput = screen.getByTestId('description-input') as HTMLInputElement;
    const newDescription = 'New Description';
    fireEvent.change(descriptionInput, { target: { value: newDescription } });
    const description = store.getState().settingsModel.userData.description;
    expect(description).toBe(newDescription);
  });
});
