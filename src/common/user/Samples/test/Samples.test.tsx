import { screen } from '@testing-library/react';
import { store } from '@/store';
import { Samples } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';

describe('Samples Unit', () => {
  beforeAll(async () => await store.dispatch.userModel.setUserData(userData));
  beforeEach(() => renderWithRematchStore(<Samples />, store));
  it('renders samples', () => {
    const userSamples = screen.getByTestId('user-samples');
    expect(userSamples).toBeTruthy();
  });
  it('renders correct sample info', () => {
    const userSamples = screen.getByTestId('user-samples');
    const firstKey = Object.keys(userData.samples.heds.hedstape)[0];
    const firstSample = userData.samples.heds.hedstape[firstKey];
    expect(userSamples).toHaveTextContent(firstSample.track);
    expect(userSamples).toHaveTextContent(firstSample.duration.toString());
  });
});
