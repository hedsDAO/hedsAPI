import { LikeButton } from '@/components/GlobalAudio/components/LikeButton/LikeButton';
import { screen, fireEvent, act } from '@testing-library/react';
import { store } from '@/store';
import { globalAudioModelState } from '@/tests/mocks/models/globalAudioModelState';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { User } from '@/models/common';

describe('LikeButton unit', () => {
  beforeEach(() => {
    store.dispatch.globalAudioModel.setState(globalAudioModelState);
    store.dispatch.authModel.setUser({ id: 123 } as User);
    renderWithRematchStore(<LikeButton />, store);
  });

  it('renders the like icon', () => {
    const likeIcon = screen.getByRole('button');
    expect(likeIcon).toBeInTheDocument();
  });

  it('removes the like button when not connected', () => {
    const likeButton = screen.getByRole('button');
    act(() => {
        store.dispatch.authModel.setUser(null);
    })
    expect(likeButton).not.toBeInTheDocument();
  });
});
