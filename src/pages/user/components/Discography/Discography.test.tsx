import { Discography } from '@/pages/user/components/Discography/Discography';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModelState';
import { act, screen } from '@testing-library/react';

describe('Discography unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
    store.dispatch.paginationModel.setState({ currentPage: 0, itemsPerPage: 4})
    renderWithRematchStore(<Discography />, store);
  });
  it('renders track items', () => {
    const trackItems = screen.getAllByTestId('track-item');
    expect(trackItems).toHaveLength(4);
  });
  it('renders 0 track items when provided none', async () => {
    act(() => {
      store.dispatch.paginationModel.setState({ currentPage: 0, itemsPerPage: 0})
      store.dispatch.userModel.setState({
        ...userModelState.user,
        user_likes: [],
      });
    });
    const trackItems = await screen.queryAllByTestId('track-item');
    expect(trackItems).toHaveLength(0);
  });
});
