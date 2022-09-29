import { screen, render } from '@testing-library/react';
import { userData } from '@/modules/user/page/tests/mocks/UserData';
import { TwitterLinkButton } from '@/modules/user/components';

describe('Twitter link button component', () => {
  it('renders correct twitter link', () => {
    render(<TwitterLinkButton loading={false} userData={userData} />);
    const twitterLink = screen.queryByTestId('user-twitter');
    const { twitterHandle } = userData;
    if (twitterHandle) {
      expect(twitterLink).toHaveAttribute('href', `https://www.twitter.com/${twitterHandle}`);
      expect(twitterLink).toHaveTextContent(`@${twitterHandle}`);
    } else expect(twitterLink).toBeFalsy();
  });
});
