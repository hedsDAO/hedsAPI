import { screen, render } from '@testing-library/react';
import { userData } from '@/pages/profile/page/tests/mocks/UserData';
import { ProfilePicture } from '@/common/user';

describe('Profile picture component', () => {
  it('renders correct profile picture', () => {
    render(<ProfilePicture />);
    const profilePictureImage = screen.getByTestId('user-profile-picture');
    const { profilePicture } = userData;
    expect(profilePictureImage).toHaveAttribute('src', profilePicture);
  });
});
