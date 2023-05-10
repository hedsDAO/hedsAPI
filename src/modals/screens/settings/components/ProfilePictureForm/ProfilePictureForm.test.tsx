import { ProfilePictureForm } from '@/modals/screens/settings/components/ProfilePictureForm/ProfilePictureForm';
import { store } from '@/store';
import { user } from '@/tests/mocks/data/user';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { screen, fireEvent } from '@testing-library/react';

describe('ProfilePictureForm unit', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
  });

  afterAll(() => {
    global.URL.createObjectURL = undefined;
  });

  beforeEach(() => {
    store.dispatch.authModel.setUser(user);
    renderWithRematchStore(<ProfilePictureForm />, store);
  });

  it('renders profile picture', () => {
    const profilePicture = screen.getByAltText('profile-picture');
    const { authModel } = store.getState();
    expect(profilePicture).toHaveAttribute('src', authModel.user.profile_picture);
  });

  class MockDataTransfer {
    items: any[];
    constructor() {
      this.items = [];
    }
    add(item: any) {
      this.items.push(item);
    }
    get files() {
      return this.items.map((item) => item.getAsFile()).filter((file) => file !== null);
    }
  }

  it('updates profile picture input value on change', async () => {
    const profilePictureInput = screen.getByTestId('profile-picture-input') as HTMLInputElement;
    const file = new File(['test'], 'profilePicture.png', { type: 'image/png' });

    const dataTransfer = new MockDataTransfer();
    dataTransfer.add({ kind: 'file', getAsFile: () => file });

    fireEvent.change(profilePictureInput, { target: { files: dataTransfer.files } });
    expect(profilePictureInput.files[0]).toStrictEqual(file);
    expect(profilePictureInput.files).toHaveLength(1);
  });
});
