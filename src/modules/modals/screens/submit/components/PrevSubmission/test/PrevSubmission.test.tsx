import { screen } from '@testing-library/react';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { PrevSubmission } from '@modals/screens/submit/components';
import { Modals } from '@/modules/modals/store/modalModel';
import {
  CONTINUE_TO_REQ_BUTTON_TEXT,
  EXIT_MODAL_BUTTON_TEXT,
  PREVIOUS_SUBMISSION_DISCLAIMER,
  PREVIOUS_SUBMISSION_TITLE,
} from '@modals/screens/submit/models/constants';

describe('PreviousSubmission Unit', () => {
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.userModel.setUserData(userData);
  });
  it('renders properly', () => {
    renderWithRematchStore(<PrevSubmission />, store);
    const prevSubmissionContainer = screen.getAllByTestId('submit-prev');
    expect(prevSubmissionContainer).toBeTruthy();
  });
  it('renders text properly', () => {
    renderWithRematchStore(<PrevSubmission />, store);
    const title = screen.getByTestId('submit-prev-title');
    const text = screen.getByTestId('submit-prev-text');
    expect(title).toHaveTextContent(PREVIOUS_SUBMISSION_TITLE);
    expect(text).toHaveTextContent(PREVIOUS_SUBMISSION_DISCLAIMER);
  });
  it('render buttons properly', () => {
    renderWithRematchStore(<PrevSubmission />, store);
    const backButton = screen.getAllByRole('button')[0];
    const continueButton = screen.getAllByRole('button')[1];
    expect(backButton).toHaveTextContent(EXIT_MODAL_BUTTON_TEXT);
    expect(continueButton).toHaveTextContent(CONTINUE_TO_REQ_BUTTON_TEXT);
  });
  it('render buttons properly', () => {
    renderWithRematchStore(<PrevSubmission />, store);
    const backButton = screen.getAllByRole('button')[0];
    const continueButton = screen.getAllByRole('button')[1];
    expect(backButton).toHaveTextContent(EXIT_MODAL_BUTTON_TEXT);
    expect(continueButton).toHaveTextContent(CONTINUE_TO_REQ_BUTTON_TEXT);
  });

});
