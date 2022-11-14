import { act, screen } from '@testing-library/react';
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

describe('ReqsAndDisclaimer Unit', () => {
  beforeEach(() => renderWithRematchStore(<ReqsAndDisclaimer />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.userModel.setUserData(userData);
  });
  it('renders properly', () => {
    const reqsAndDisclaimerContainer = screen.getAllByTestId('submit-reqs');
    expect(reqsAndDisclaimerContainer).toBeTruthy();
  });
  it('renders headings', () => {
    const headings = screen.getAllByRole('heading');
    const reqHeading = headings[0];
    const discHeading = headings[1];
    expect(reqHeading).toHaveTextContent(REQUIREMENTS_HEADING);
    expect(discHeading).toHaveTextContent(DISCLAIMER_HEADING);
  });
  it('renders badges + labels', () => {
    const bpmBadge = screen.getByTestId(`label-badge-${BPM_LABEL}`);
    const lengthBadge = screen.getByTestId(`label-badge-${LENGTH_LABEL}`);
    const sampleBadge = screen.getByTestId(`label-badge-${SAMPLE_LABEL}`);
    expect(bpmBadge).toHaveTextContent(BPM_LABEL);
    expect(lengthBadge).toHaveTextContent(LENGTH_LABEL);
    expect(sampleBadge).toHaveTextContent(SAMPLE_LABEL);
    expect(bpmBadge.lastChild).toHaveTextContent('0');
    expect(lengthBadge.lastChild).toHaveTextContent(LENGTH_VALUE);
    expect(sampleBadge.lastChild).toHaveTextContent(SAMPLE_VALUE);
  });
  it('renders checkbox and disclaimer', async () => {
    const checkboxes = await screen.getAllByRole('checkbox');
    const reqsText = await screen.findByText(REQUIREMENTS);
    const discText = await screen.findByText(DISCLAIMER);
    const reqsCheckbox = checkboxes[0];
    const discCheckbox = checkboxes[1];
    expect(reqsCheckbox).not.toBeChecked();
    expect(discCheckbox).not.toBeChecked();
    await act(() => reqsCheckbox.click());
    await act(() => discCheckbox.click());
    expect(reqsText).toBeTruthy();
    expect(discText).toBeTruthy();
  });
  it('renders buttons', () => {
    const backButton = screen.getAllByRole('button')[0];
    const continueButton = screen.getAllByRole('button')[1];
    expect(backButton).toHaveTextContent(EXIT_MODAL_BUTTON_TEXT);
    expect(continueButton).toHaveTextContent(CONTINUE_AGREE_BUTTON_TEXT);
  });
});
