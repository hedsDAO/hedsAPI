import { screen, render } from '@testing-library/react';
import { userData } from '@/pages/profile/page/tests/mocks/UserData';
import { DisplayName } from '@/common/user';

describe('Display name component', () => {
  it('renders correct display name', () => {
    render(<DisplayName />);
    const displayNameText = screen.getByTestId('user-display-name');
    const { displayName } = userData;
    expect(displayNameText).toHaveTextContent(displayName);
  });
});
