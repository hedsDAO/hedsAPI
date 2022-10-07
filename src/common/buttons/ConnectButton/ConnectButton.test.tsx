// import { fireEvent, screen, render, waitFor } from '@testing-library/react';
// import { userData } from '@/modules/user/page/tests/mocks/UserData';
// import { CopyWalletButton } from '@/common/components/buttons';
// import { formatWallet } from '@/utils';

describe('Twitter link button component', () => {
  it('renders correct twitter link', () => {
    // render(<CopyWalletButton loading={false} wallet={userData.wallet} />);
    // const walletText = screen.queryByTestId('user-wallet');
    // const { wallet } = userData;
    // expect(walletText).toHaveTextContent(formatWallet(wallet));
  });

  it('renders correct twitter link', async () => {
    // render(<CopyWalletButton loading={false} wallet={userData.wallet} />);
    // const copyButton = screen.queryByTestId('user-wallet');
    // const copyContainer = screen.queryByTestId('user-copy-container');
    // fireEvent.click(copyButton);
    // await expect(copyContainer.lastChild).toHaveTextContent('copied');
    // await expect(document.execCommand).toHaveBeenCalledWith('copy');
    // await waitFor(() => expect(copyContainer.lastChild).not.toHaveTextContent('copied'));
  });
});
