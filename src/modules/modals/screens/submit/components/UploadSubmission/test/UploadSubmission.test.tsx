import { act, screen } from '@testing-library/react';
import { Modals } from '@/modules/modals/store/modalModel';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { UploadSubmission } from '@modals/screens/submit/components';
import { BACK_TO_REQ_BUTTON_TEXT, CONTINUE_TO_PREVIEW_BUTTON_TEXT } from '../../../models/constants';

describe('UploadSubmission Unit', () => {
  const mockFile = new File(['hello'], 'test.wav', { type: 'audio/wav' });
  beforeEach(() => renderWithRematchStore(<UploadSubmission />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.userModel.setUserData(userData);
  });
  it('renders properly', () => {
    const UploadSubmission = screen.getAllByTestId('submit-upload');
    expect(UploadSubmission).toBeTruthy();
  });
  it('renders buttons', () => {
    const uploadButtons = screen.getAllByRole('button');
    const backButton = uploadButtons[0];
    const continueButton = uploadButtons[1];
    expect(backButton).toHaveTextContent(BACK_TO_REQ_BUTTON_TEXT);
    expect(continueButton).toHaveTextContent(CONTINUE_TO_PREVIEW_BUTTON_TEXT);
  });
  it('disables button without upload', async () => {
    const uploadButtons = screen.getAllByRole('button');
    const continueButton = uploadButtons[1];
    expect(continueButton).toBeDisabled();
    await act(() => {
      store.dispatch.submitModel.setFile(mockFile);
    });
    expect(continueButton).not.toBeDisabled();
  });
});
