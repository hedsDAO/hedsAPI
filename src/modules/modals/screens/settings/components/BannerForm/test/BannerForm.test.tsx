import { screen } from '@testing-library/react';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { BannerForm } from '@modals/screens/settings/components';
import { Modals } from '@/modules/modals/store/modalModel';
import { BANNER_DESCRIPTION, BANNER_TITLE, UPLOAD_BUTTON_TEXT } from '../../../models/constants';

describe('BannerForm Unit', () => {
  beforeEach(() => renderWithRematchStore(<BannerForm />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SETTINGS_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.profileModel.setProfileData(userData);
  });
  it('renders properly', () => {
    const bannerFormContainer = screen.getAllByTestId('banner-form');
    expect(bannerFormContainer).toBeTruthy();
  });
  it('renders text properly', async () => {
    const bannerFormTitle = await screen.findByText(BANNER_TITLE);
    const bannerFormDescription = await screen.findByText(BANNER_DESCRIPTION);
    expect(bannerFormTitle).toBeTruthy();
    expect(bannerFormDescription).toBeTruthy();
  });
  it('renders button text properly', async () => {
    const buttons = await screen.getAllByRole('button');
    const uploadButton = buttons[0];
    const trashButton = buttons[1];
    expect(uploadButton).toHaveTextContent(UPLOAD_BUTTON_TEXT);
    expect(trashButton).toBeInTheDocument();
  });
});
