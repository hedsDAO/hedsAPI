import { screen } from '@testing-library/react';
import { store } from '@/store';
import { Banner } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';

describe('Banner Unit', () => {
  beforeAll(async () => {
    await store.dispatch.userModel.setUserData(userData);
  });
  it('renders banner', () => {
    renderWithRematchStore(<Banner />, store);
    const userBanner = screen.getByTestId('user-banner');
    const { banner } = userData;
    expect(userBanner).toHaveAttribute('src', banner);
  });
});
