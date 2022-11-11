import { screen } from '@testing-library/react';
import { store } from '@/store';
import { ProfilePicture } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';

describe('ProfilePicture Unit', () => {
  beforeAll(() => store.dispatch.userModel.setUserData(userData));
  beforeEach(() => renderWithRematchStore(<ProfilePicture />, store));
  it('renders profile picture', () => {
    const userProfilePicture = screen.getByTestId('user-profile-picture');
    expect(userProfilePicture).toBeTruthy();
  });
  it('renders correct img', () => {
    const userProfilePicture = screen.getByTestId('user-profile-picture');
    const { profilePicture } = userData;
    expect(userProfilePicture).toHaveAttribute('src', profilePicture);
  });
});
