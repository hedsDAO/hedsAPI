import { screen } from '@testing-library/react';
import { store } from '@/store';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { SubmitSuccess } from '@modals/screens/submit/components';
import { Modals } from '@/modules/modals/store/modalModel';
import { ANON_ID_TEXT, BACK_TO_TAPE_BUTTON_TEXT, SUCCESS_MESSAGE_TEXT, SUCCESS_TITLE } from '../../../models/constants';

describe('SubmitSuccess Unit', () => {
  const mockSubmission = userData.submissions['heds']['hedstape']['5'];

  beforeEach(() => renderWithRematchStore(<SubmitSuccess />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.userModel.setUserData(userData);
    store.dispatch.submitModel.setSubmission(mockSubmission);
  });
  it('renders properly', () => {
    const SubmitSuccessContainer = screen.getAllByTestId('submit-success');
    expect(SubmitSuccessContainer).toBeTruthy();
  });
  it('renders title', () => {
    const successHeader = screen.getByRole('heading');
    expect(successHeader).toHaveTextContent(SUCCESS_TITLE);
  })
  it('renders text and anon ', () => {
    const anonIdName = screen.getByTestId("submit-anon-name")
    const successText = screen.getAllByText(SUCCESS_MESSAGE_TEXT);
    const anonText = screen.getAllByText(ANON_ID_TEXT);
    expect(successText).toBeTruthy()
    expect(anonText).toBeTruthy()
    expect(anonIdName).toHaveTextContent(mockSubmission.track);
  })
  it('renders buttons', () => {
    const backButton = screen.getByRole('button');
    expect(backButton).toHaveTextContent(BACK_TO_TAPE_BUTTON_TEXT);
  });
});
