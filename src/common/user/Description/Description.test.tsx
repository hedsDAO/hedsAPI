import { screen, render } from '@testing-library/react';
import { userData } from '@/pages/profile/page/tests/mocks/UserData';
import { Description } from '@/common/user';

describe('User description component', () => {
  it('renders correct user description', () => {
    render(<Description loading={false} userData={userData} />);
    const descriptionText = screen.getByTestId('user-description');
    const { description } = userData;
    expect(descriptionText).toHaveTextContent(description || '...');
  });
});
