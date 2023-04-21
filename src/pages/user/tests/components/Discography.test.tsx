import { Discography } from '@/pages/user/components/Discography';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModel';
import { act, screen } from '@testing-library/react';

describe('Discography unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
    renderWithRematchStore(<Discography />, store);
  });
  it('renders track items', () => {
    act(() => {
        console.log(store.getState().userModel.user_songs)
    });
    const trackItems = screen.getAllByTestId('track-item');
    expect(trackItems).toHaveLength;
  });
  it('renders 0 track items when provided none', async () => {
    act(() => {
      store.dispatch.userModel.setUser({
        ...userModelState,
        user_songs: [],
      });
    });
    const trackItems = await screen.queryAllByTestId('track-item');
    expect(trackItems).toHaveLength(0);
  });
});
