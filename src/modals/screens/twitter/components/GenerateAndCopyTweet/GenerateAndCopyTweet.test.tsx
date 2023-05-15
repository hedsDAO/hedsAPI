import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { GenerateAndCopyTweet } from '@/modals/screens/twitter/components/GenerateAndCopyTweet/GenerateAndCopyTweet';
import { TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import { store } from '@/store';
import { user } from '@/tests/mocks/data/user';
import { Modals } from '@/modals/models/modalModel';
import { act, screen } from '@testing-library/react';
import { COPY_TWEET_BUTTON_TEXT, GENERATE_TWEET_BUTTON_TEXT, GENERATE_TWEET_NEXT_BUTTON_TEXT } from '../../models/constants';

describe('GenerateAndCopyTweet unit', () => {
  beforeEach(() => {
    store.dispatch.authModel.setUser(user);
    store.dispatch.modalModel.setModal(Modals.TWITTER);
    store.dispatch.twitterModel.setCurrentStep(TwitterModalSteps.GENERATE_AND_COPY_TWEET);
    renderWithRematchStore(<GenerateAndCopyTweet />, store);
  });

  it('renders empty input, disables next button and input field on mount', () => {
    const input = screen.getByTestId('twitter-input');
    const nextButton = screen.getByText(GENERATE_TWEET_NEXT_BUTTON_TEXT);
    expect(input).toBeDisabled();
    expect(input).toHaveValue('');
    expect(nextButton).toBeDisabled();
  });

  it('should populate input, show next button when tweet is generated and copied', () => {
    const generateButton = screen.getByText(GENERATE_TWEET_BUTTON_TEXT);
    const input = screen.getByTestId('twitter-input');
    act(() => {
      generateButton.click();
      store.dispatch.twitterModel.setTweet('123');
      store.dispatch.twitterModel.setIsCopied(true);
    });
    const nextButton = screen.getByText(GENERATE_TWEET_NEXT_BUTTON_TEXT);
    expect(nextButton).toBeInTheDocument();
    expect(input).toHaveValue('123');
  });

  it('should proceed to next step if tweet is generate/copied and next btn is clicked', () => {
    act(() => {
      store.dispatch.twitterModel.setTweet('123');
      store.dispatch.twitterModel.setIsCopied(true);
    });
    const nextButton = screen.getByText(GENERATE_TWEET_NEXT_BUTTON_TEXT);
    act(() => {
        nextButton.click()
    })
    const currentStep = store.getState().twitterModel.currentStep;
    expect(currentStep).toBe(TwitterModalSteps.VERIFY_TWEET);
  });
});
