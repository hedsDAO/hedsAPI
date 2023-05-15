import { act, screen } from '@testing-library/react';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { Confirm } from '@/modals/screens/twitter/components/Confirm/Confirm';
import { TwitterModalState, TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import { store } from '@/store';
import { user } from '@/tests/mocks/data/user';
import { Modals } from '@/modals/models/modalModel';

describe('Confirm unit', () => {
  beforeEach(() => {
    store.dispatch.authModel.setUser(user);
    store.dispatch.modalModel.setModal(Modals.TWITTER);
    store.dispatch.twitterModel.setCurrentStep(TwitterModalSteps.CONFIRM);
    store.dispatch.twitterModel.setTwitterHandle('twitterHandle');
    renderWithRematchStore(<Confirm />, store);
  });

  it('should render both the users display name and requested twitter handle', () => {
    const displayNameText = screen.getByText(user.display_name);
    const twitterHandleText = screen.getByText('@' + 'twitterHandle');
    expect(displayNameText).toBeInTheDocument();
    expect(twitterHandleText).toBeInTheDocument();
  });

  it('should close and reset the state of the modal when confirm btn is pressed', () => {
    const confirmButton = screen.getByRole('button');
    act(() => {
      confirmButton.click();
    });
    expect(store.getState().twitterModel).toEqual({ currentStep: TwitterModalSteps.GENERATE_AND_COPY_TWEET } as TwitterModalState);
  });
});
