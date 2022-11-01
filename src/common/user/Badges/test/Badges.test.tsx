import { screen } from '@testing-library/react';
import { store } from '@/store';
import { Badges } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';

describe('Badges Unit', () => {
  beforeAll(async () => {
    await store.dispatch.userModel.setUserData(userData);
  });
  it('renders badges', () => {
    renderWithRematchStore(<Badges />, store);
    const userBadges = screen.getAllByTestId('user-badge-container');
    expect(userBadges).toBeTruthy();
  });
  it('renders correct src', () => {
    renderWithRematchStore(<Badges />, store);
    const userBadges = screen.getAllByTestId('user-badge-container');
    const { badges } = userData;
    expect(userBadges[0]).toHaveTextContent(badges[0].name);
  });
});
