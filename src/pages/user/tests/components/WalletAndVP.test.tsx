import { WalletAndVP } from '@pages/user/components/WalletAndVP';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModelState';
import { screen } from '@testing-library/react';

describe('WalletAndVP unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
    renderWithRematchStore(<WalletAndVP />, store);
  });

  it('renders wallet address', () => {
    const truncatedWalletAddress = screen.getByText(userModelState.user.wallet.slice(0, 6));
    expect(truncatedWalletAddress).toBeInTheDocument();
  });

  it('renders wallet link with correct href', () => {
    const walletLink = screen.getByText(userModelState.user.wallet.slice(0, 6)).closest('a');
    expect(walletLink).toHaveAttribute('href', `https://www.etherscan.com/address/${userModelState.user.wallet}`);
  });
});
