import { Collection } from '@/pages/user/components/Collection';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { userModelState } from '@/tests/mocks/models/userModel';
import { act, screen } from '@testing-library/react';

describe('Collection unit', () => {
  beforeEach(() => {
    store.dispatch.userModel.setState(userModelState);
    renderWithRematchStore(<Collection />, store);
  });
  it('renders collection items', () => {
    const collectionItems = screen.getAllByTestId('collection-item');
    // pagination limit (4)
    expect(collectionItems).toHaveLength(4);
  });
  it('renders no collection items when provided 0', async () => {
    act(() => {
      store.dispatch.userModel.setUser({
        ...userModelState,
        user: {
          ...userModelState.user,
          collection: {},
        },
      });
    });
    const collectionItems = await screen.queryAllByTestId('collection-item');
    expect(collectionItems).toHaveLength(0);
  });
});
