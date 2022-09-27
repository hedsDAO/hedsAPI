import React from 'react';
import { User } from '@/modules/user/page/User';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { act, screen, waitFor } from '@testing-library/react';
import { userData } from '@/modules/user/page/tests/mocks/UserData';
import { formatWallet } from '@/utils';

describe('User unit', () => {
  describe('snapshot', () => {
    test('snapshot', async () => {
      await store.dispatch.userModel.setUserData(userData);
      const snapshot = renderWithRematchStore(<User />, store);
      expect(snapshot).toMatchSnapshot();
    });
  });
  describe('renders user data properly', () => {
    beforeEach(
      async () =>
        await act(() => {
          store.dispatch.userModel.setUserData(userData);
          renderWithRematchStore(<User />, store);
        }),
    );
    it('renders profile picture', () => {
      const profilePictureImage = screen.getByTestId('user-profile-picture');
      const { profilePicture } = userData;
      expect(profilePictureImage).toHaveAttribute('src', profilePicture);
    });
    it('renders display name', () => {
      const displayNameText = screen.getByTestId('user-display-name');
      const { displayName } = userData;
      expect(displayNameText).toHaveTextContent(displayName);
    });
    it('renders description', async () => {
      const descriptionText = screen.getByTestId('user-description');
      const { description } = userData;
      expect(descriptionText).toHaveTextContent(description || '...')
    });
    it('renders twitter link if present', () => {
      const twitterLink = screen.queryByTestId('user-twitter');
      const { twitterHandle } = userData;
      if (twitterHandle) {
        expect(twitterLink).toHaveAttribute('href', `https://www.twitter.com/${twitterHandle}`);
        expect(twitterLink).toHaveTextContent(`@${twitterHandle}`);
      } else expect(twitterLink).toBeFalsy();
    });
    it('renders wallet address', () => {
      const walletText = screen.queryByTestId('user-wallet');
      const { wallet } = userData;
      expect(walletText).toHaveTextContent(formatWallet(wallet));
    });
    it('copies wallet address to clipboard', () => {
      document.execCommand = jest.fn();
      const copyButton = screen.queryByTestId('user-wallet');
      const copyContainer = screen.queryByTestId('user-copy-container');
      act(() => copyButton.click());
      expect(copyContainer.lastChild).toHaveTextContent('copied');
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      waitFor(() => expect(copyContainer.lastChild).not.toHaveTextContent('copied'));
    });
    it('renders user submissions', () => {
      const userSubmissions = screen.queryByTestId('user-submissions');
      const { submissions } = userData;
      if (!submissions) expect(userSubmissions).toBeEmptyDOMElement();
      else Object.values(submissions.heds.hedstape).map((sub) => expect(userSubmissions).toHaveTextContent(sub.track));
    });
  });
});
