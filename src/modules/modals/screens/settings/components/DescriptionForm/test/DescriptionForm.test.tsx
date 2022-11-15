import { act, screen } from '@testing-library/react';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { DescriptionForm } from '@modals/screens/settings/components';
import { Modals } from '@/modules/modals/store/modalModel';
import { CHARS_REMAINING, DESCRIPTION_FORM_DESCRIPTION, DESCRIPTION_FORM_TITLE, UPLOAD_BUTTON_TEXT } from '../../../models/constants';

describe('DescriptionForm Unit', () => {
  beforeEach(() => renderWithRematchStore(<DescriptionForm />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SETTINGS_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.profileModel.setProfileData(userData);
  });
  it('renders properly', () => {
    const descriptionFormContainer = screen.getAllByTestId('description-form');
    expect(descriptionFormContainer).toBeTruthy();
  });
  it('renders text properly', async () => {
    const descriptionFormTitle = await screen.findByText(DESCRIPTION_FORM_TITLE);
    const descriptionFormDescription = await screen.findByText(DESCRIPTION_FORM_DESCRIPTION);
    expect(descriptionFormTitle).toBeTruthy();
    expect(descriptionFormDescription).toBeTruthy();
  });
  it('renders characters remaining upon input', async () => {
    const maxLimit = 130;
    const input = 1;
    act(() => {
      store.dispatch.settingsModel.setDescCharacters(input);
    });
    const characterRemainingText = await screen.findByText(maxLimit - input + ' ' + CHARS_REMAINING);
    expect(characterRemainingText).toBeTruthy();
  });
});
