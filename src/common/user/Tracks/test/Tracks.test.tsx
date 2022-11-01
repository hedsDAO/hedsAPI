import { screen } from '@testing-library/react';
import { store } from '@/store';
import { Tracks } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { formatTime } from '@/utils';

describe('Tracks Unit', () => {
  beforeAll(async () => await store.dispatch.userModel.setUserData(userData));
  beforeEach(() => renderWithRematchStore(<Tracks />, store));
  it('renders tracks', () => {
    const userTracks = screen.getByTestId('user-tracks');
    expect(userTracks).toBeTruthy();
  });
  it('renders correct track info', () => {
    const userTracks = screen.getByTestId('user-tracks');
    const firstKey = Object.keys(userData.tracks.heds.hedstape)[0];
    const firstTrack = userData.tracks.heds.hedstape[firstKey];
    expect(userTracks).toHaveTextContent(firstTrack.tape);
  });
});
