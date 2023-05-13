import { act, screen } from '@testing-library/react';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { VerifyTweet } from '@/modals/screens/twitter/components/VerifyTweet/VerifyTweet';
import { TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import { store } from '@/store';
import { user } from '@/tests/mocks/data/user';
import { Modals } from '@/modals/models/modalModel';
import { GENERAL_ERROR_TEXT } from '../../models/constants';

describe('VerifyTweet unit', () => {
  beforeEach(() => {
    store.dispatch.authModel.setUser(user);
    store.dispatch.modalModel.setModal(Modals.TWITTER);
    store.dispatch.twitterModel.setCurrentStep(TwitterModalSteps.VERIFY_TWEET);
    store.dispatch.twitterModel.setTwitterHandle('twitterHandle');
    store.dispatch.twitterModel.setTweet('123');
    renderWithRematchStore(<VerifyTweet />, store);
  });

  it('should render twitter link btn and verify button', () => {
    const allButtons = screen.getAllByRole('button');
    const twitterButton = allButtons[0];
    const verifyButton = allButtons[1];
    expect(twitterButton).toBeInTheDocument();
    expect(verifyButton).toBeInTheDocument();
  });

  it('expect buttons to be disabled when loading', () => {
    const allButtons = screen.getAllByRole('button');
    const twitterButton = allButtons[0];
    const verifyButton = allButtons[1];
    act(() => {
      store.dispatch.twitterModel.setIsLoading(true);
    });
    expect(twitterButton).toBeDisabled();
    expect(verifyButton).toBeDisabled();
    act(() => {
      store.dispatch.twitterModel.setIsLoading(false);
    });
    expect(twitterButton).not.toBeDisabled();
    expect(verifyButton).not.toBeDisabled();
  });

  it('shows error text when an error is present', () => {
    act(() => {
      store.dispatch.twitterModel.setError(GENERAL_ERROR_TEXT);
    });
    expect(screen.getByText(GENERAL_ERROR_TEXT)).toBeInTheDocument();
  });
});
