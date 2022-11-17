import { act, screen } from '@testing-library/react';
import { Modals } from '@/modules/modals/store/modalModel';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { VerifyAndSubmit } from '@modals/screens/submit/components';
import {
  BACK_TO_UPLOAD_BUTTON_TEXT,
  CONFIRM_AND_UPLOAD_BUTTON_TEXT,
  IPFS_LOADING_TEXT,
  PREVIEW_SUBMISSION_TEXT,
} from '@modals/screens/submit/models/constants';

describe('VerifyAndSubmit Unit', () => {
  beforeEach(() => renderWithRematchStore(<VerifyAndSubmit />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.userModel.setUserData(userData);
  });
  it('renders properly', () => {
    const UploadSubmissionContainer = screen.getAllByTestId('submit-verify');
    expect(UploadSubmissionContainer).toBeTruthy();
  });
  it('renders loading and preview text', async () => {
    await act(() => {
      store.dispatch.submitModel.setIsLoading(true);
    });
    const loadingText = screen.getAllByText(IPFS_LOADING_TEXT);
    expect(loadingText).toBeTruthy();
    await act(() => {
      store.dispatch.submitModel.setIsLoading(false);
    });
    const previewSubmissionText = screen.getAllByText(PREVIEW_SUBMISSION_TEXT);
    expect(previewSubmissionText).toBeTruthy();
  });
  it('renders buttons', () => {
    const buttons = screen.getAllByRole('button');
    const backButton = buttons[1];
    const continueButton = buttons[2];
    expect(backButton).toHaveTextContent(BACK_TO_UPLOAD_BUTTON_TEXT);
    expect(continueButton).toHaveTextContent(CONFIRM_AND_UPLOAD_BUTTON_TEXT);
  });
  it('disables button when uploading', async () => {
    await act(() => {
      store.dispatch.submitModel.setIsUploading(true);
    });
    const buttons = screen.getAllByRole('button');
    const continueButton = buttons[2];
    expect(continueButton).toBeDisabled();
    await act(() => {
      store.dispatch.submitModel.setIsUploading(false);
    });
    expect(continueButton).not.toBeDisabled();
  });
});
