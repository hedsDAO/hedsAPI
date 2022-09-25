import React from 'react';
import { User } from '@pages/User/User';
import { store } from '@/store';
import renderer from 'react-test-renderer';
import { renderWithRematchStore } from '../../utils/testUtils';
import { act, screen, waitFor } from '@testing-library/react';
import { userData } from '../../mockData/User/UserData';
import { formatWallet } from '@utils/formatWallet';

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
    it('should render profile picture', () => {
      const profilePictureImage = screen.getByTestId('user-profile-picture');
      const { profilePicture } = userData;
      expect(profilePictureImage).toHaveAttribute('src', profilePicture);
    });
    it('should render display name', () => {
      const displayNameText = screen.getByTestId('user-display-name');
      const { displayName } = userData;
      expect(displayNameText).toHaveTextContent(displayName);
    });
    it('should render desciption', () => {
      const descriptionText = screen.getByTestId('user-description');
      const { description } = userData;
      expect(descriptionText).toHaveTextContent(description || '...');
    });
    it('should render twitter link if present', () => {
      const twitterLink = screen.queryByTestId('user-twitter-link');
      const twitterText = screen.queryByTestId('user-twitter-text');
      const { twitterHandle } = userData;
      if (twitterHandle) {
        expect(twitterLink).toHaveAttribute('href', `https://www.twitter.com/${twitterHandle}`);
        expect(twitterText).toHaveTextContent(`@${twitterHandle}`);
      } else expect(twitterText && twitterLink).toBeFalsy();
    });
    it('should render wallet address', () => {
      const walletText = screen.queryByTestId('user-wallet');
      const { wallet } = userData;
      expect(walletText).toHaveTextContent(formatWallet(wallet));
    });
    it('should copy wallet address to clipboard', () => {
      document.execCommand = jest.fn();
      const copyButton = screen.queryByTestId('user-wallet');
      const copyContainer = screen.queryByTestId('user-copy-container');
      act(() => copyButton.click());
      expect(copyContainer.lastChild).toHaveTextContent('copied');
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      waitFor(() => expect(copyContainer.lastChild).not.toHaveTextContent('copied'));
    });
    it('should render user submissions', () => {
      const userSubmissions = screen.queryByTestId('user-submissions');
      const { submissions } = userData;
      if (!submissions) expect(userSubmissions).toBeEmptyDOMElement();
      else Object.values(submissions.heds.hedstape).map((sub) => expect(userSubmissions).toHaveTextContent(sub.track));
    });
  });
});
