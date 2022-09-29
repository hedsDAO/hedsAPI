import { screen, render } from '@testing-library/react';
import { userData } from '@/modules/user/page/tests/mocks/UserData';
import { UserDescription } from '@/modules/user/components';

describe('User description component', () => {
  it('renders correct user description', () => {
    render(<UserDescription loading={false} userData={userData} />);
    const descriptionText = screen.getByTestId('user-description');
    const { description } = userData;
    expect(descriptionText).toHaveTextContent(description || '...');
  });
});
