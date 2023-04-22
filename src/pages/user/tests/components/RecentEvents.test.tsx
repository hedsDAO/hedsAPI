import { RecentEvents } from '@/pages/user/components/RecentEvents';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModel';
import { act, screen } from '@testing-library/react';

describe('RecentEvents unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
    renderWithRematchStore(<RecentEvents />, store);
  });

  it('renders user events items', () => {
    const userEventItem = screen.getAllByTestId('user-event-item');
    const { user_events } = userModelState;
    expect(userEventItem).toHaveLength(user_events.length);
  });

  it('renders 0 user events items when provided none', async () => {
    act(() => {
      store.dispatch.userModel.setState({
        ...userModelState,
        user_events: [],
      });
    });
    const eventEventItem = screen.queryByTestId('user-event-item');
    expect(eventEventItem).not.toBeInTheDocument();
  });

});
