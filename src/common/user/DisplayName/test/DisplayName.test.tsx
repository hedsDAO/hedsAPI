import { screen } from '@testing-library/react';
import { store } from '@/store';
import { DisplayName } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';

describe('DisplayName Unit', () => {
  beforeAll(() => store.dispatch.userModel.setUserData(userData));
  beforeEach(() => renderWithRematchStore(<DisplayName />, store));
  it('renders display name', () => {
    const userDisplayName = screen.getByTestId('user-display-name');
    expect(userDisplayName).toBeTruthy();
  });
  it('renders correct name', () => {
    const userDisplayName = screen.getByTestId('user-display-name');
    const { displayName } = userData;
    expect(userDisplayName).toHaveTextContent(displayName);
  });
});
