import { screen } from '@testing-library/react';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { ProfilePictureForm } from '@modals/screens/settings/components';
import { Modals } from '@/modules/modals/store/modalModel';
import { PROFILE_PICTURE_DESCRIPTION, PROFILE_PICTURE_TITLE, UPLOAD_BUTTON_TEXT } from '../../../models/constants';

describe('ProfilePictureForm Unit', () => {
  beforeEach(() => renderWithRematchStore(<ProfilePictureForm />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SETTINGS_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.profileModel.setProfileData(userData);
  });
  it('renders properly', () => {
    const profilePictureFormContainer = screen.getAllByTestId('profile-picture-form');
    expect(profilePictureFormContainer).toBeTruthy();
  });
  it('renders text properly', async () => {
    const profilePictureFormTitle = await screen.findByText(PROFILE_PICTURE_TITLE);
    const profilePictureFormDescription = await screen.findByText(PROFILE_PICTURE_DESCRIPTION);
    expect(profilePictureFormTitle).toBeTruthy();
    expect(profilePictureFormDescription).toBeTruthy();
  });
  it('renders button text properly', async () => {
    const buttons = await screen.getAllByRole('button');
    const uploadButton = buttons[0];
    const trashButton = buttons[1];
    expect(uploadButton).toHaveTextContent(UPLOAD_BUTTON_TEXT);
    expect(trashButton).toBeInTheDocument();
  });
});
