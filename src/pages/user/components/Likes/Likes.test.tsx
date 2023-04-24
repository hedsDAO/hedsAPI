import { Likes } from '@/pages/user/components/Likes/Likes';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModelState';
import { act, screen } from '@testing-library/react';

describe('Likes unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
    store.dispatch.paginationModel.setState({ currentPage: 0, itemsPerPage: 4})
    renderWithRematchStore(<Likes />, store);
  });
  it('renders track items', () => {
    const trackItems = screen.getAllByTestId('liked-item');
    const { user_likes } = userModelState;
    expect(trackItems).toHaveLength(user_likes.length || 4);
  });
  it('renders 0 track items when provided none', async () => {
    act(() => {
      store.dispatch.paginationModel.setState({ currentPage: 0, itemsPerPage: 0})
      store.dispatch.userModel.setState({
        ...userModelState,
        user_likes: [],
      });
    });
    const trackItems = await screen.queryAllByTestId('liked-item');
    expect(trackItems).toHaveLength(0);
  });
});
