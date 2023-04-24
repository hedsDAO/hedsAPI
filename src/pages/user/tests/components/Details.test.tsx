import { Details } from '@/pages/user/components/Details';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModelState';
import { screen } from '@testing-library/react';

describe('Details unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
  });

  it('renders display name', () => {
    renderWithRematchStore(<Details />, store);
    const displayName = screen.getByText(userModelState.user.display_name);
    expect(displayName).toBeInTheDocument();
  });

  it('renders description', () => {
    renderWithRematchStore(<Details />, store);
    const description = screen.getByText(userModelState.user.description);
    expect(description).toBeInTheDocument();
  });

  it('renders twitter handle button', () => {
    renderWithRematchStore(<Details />, store);
    const twitterButton = screen.getAllByTestId('twitter-button')[0];
    const twitterHandle = userModelState.user.twitter_handle;
    expect(twitterButton).toBeInTheDocument();
    expect(twitterButton).toHaveAttribute('href', `https://www.twitter.com/${twitterHandle}`);
  });

  it('renders wallet address button', () => {
    renderWithRematchStore(<Details />, store);
    const walletButton = screen.getAllByTestId('wallet-button')[0];
    const wallet = userModelState.user.wallet;
    expect(walletButton).toBeInTheDocument();
    expect(walletButton).toHaveAttribute('href', `https://www.etherscan.com/address/${wallet}`);
    expect(walletButton).toHaveTextContent(wallet.slice(0, 6));
  });
});
