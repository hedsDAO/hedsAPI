import { screen } from '@testing-library/react';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { ReqsAndDisclaimer } from '@modals/screens/submit/components';
import { Modals } from '@/modules/modals/store/modalModel';
import {
  DISCLAIMER,
  REQUIREMENTS,
  DISCLAIMER_HEADING,
  REQUIREMENTS_HEADING,
  CONTINUE_AGREE_BUTTON_TEXT,
  EXIT_MODAL_BUTTON_TEXT,
  BPM_LABEL,
  LENGTH_LABEL,
  LENGTH_VALUE,
  SAMPLE_LABEL,
  SAMPLE_VALUE,
} from '@modals/screens/submit/models/constants';

describe('PreviousSubmission Unit', () => {
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.userModel.setUserData(userData);
  });
  it('renders properly', () => {
    renderWithRematchStore(<ReqsAndDisclaimer />, store);
    const prevSubmissionContainer = screen.getAllByTestId('submit-reqs');
    expect(prevSubmissionContainer).toBeTruthy();
  });
  it('renders headings properly', () => {
    renderWithRematchStore(<ReqsAndDisclaimer />, store);
    const headings = screen.getAllByRole('heading');
    const reqHeading = headings[0];
    const discHeading = headings[1];
    expect(reqHeading).toHaveTextContent(REQUIREMENTS_HEADING);
    expect(discHeading).toHaveTextContent(DISCLAIMER_HEADING);
  });
});
