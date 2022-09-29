import { screen, render } from '@testing-library/react';
import { userData } from '@/modules/user/page/tests/mocks/UserData';
import { DisplayName } from '@/modules/user/components';

describe('Display name component', () => {
  it('renders correct display name', () => {
    render(<DisplayName loading={false} userData={userData} />);
    const displayNameText = screen.getByTestId('user-display-name');
    const { displayName } = userData;
    expect(displayNameText).toHaveTextContent(displayName);
  });
});
