import { Banner } from '@/pages/user/components/Banner';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModel';
import { screen } from '@testing-library/react';

describe('Banner unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
  });

  it('renders banner', () => {
    renderWithRematchStore(<Banner />, store);
    const userBanner = screen.getByTestId('user-banner-image');
    const { banner } = userModelState;
    expect(userBanner).toHaveAttribute('src', banner);
  });

  it('renders skeleton while loading', () => {
    renderWithRematchStore(<Banner />, store);
    const userBannerSkeleton = screen.getByTestId('user-banner-skeleton');
    expect(userBannerSkeleton).toBeInTheDocument();
  });
});
