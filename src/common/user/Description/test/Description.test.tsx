import { screen } from '@testing-library/react';
import { store } from '@/store';
import { Description } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';

describe('Description Unit', () => {
  beforeAll(async () => await store.dispatch.userModel.setUserData(userData));
  beforeEach(() => renderWithRematchStore(<Description />, store));
  it('renders description', () => {
    const userDescription = screen.getByTestId('user-description');
    expect(userDescription).toBeTruthy();
  });
  it('renders correct text content', () => {
    const userDescription = screen.getByTestId('user-description');
    const { description } = userData;
    expect(userDescription).toHaveTextContent(description || '...');
  });
});
