import { ProfilePicture } from '@/pages/user/components/ProfilePicture';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModelState';
import { screen } from '@testing-library/react';

describe('ProfilePicture unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
  });

  it('renders profile picture', () => {
    renderWithRematchStore(<ProfilePicture />, store);
    const profilePicture = screen.getByAltText('user profile picture');
    const { profile_picture } = userModelState.user;
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture).toHaveAttribute('src', profile_picture);
  });
});
