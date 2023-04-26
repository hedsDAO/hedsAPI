import { BannerForm } from '@/modals/screens/settings/components/BannerForm/BannerForm';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { settingsModelState } from '@/tests/mocks/models/settingsModelState';
import { user } from '@/tests/mocks/data/user';
import { fireEvent, screen } from '@testing-library/react';

describe('BannerForm unit', () => {
    
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
  });

  afterAll(() => {
    global.URL.createObjectURL = undefined;
  });

  beforeEach(() => {
    store.dispatch.authModel.setUser(user);
  });

  it('renders BannerForm with initial banner value', () => {
    renderWithRematchStore(<BannerForm />, store);
    const bannerInput = screen.getByTestId('banner-preview');
    const { banner } = settingsModelState.userData;
    expect(bannerInput).toHaveAttribute('src', banner);
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

  it('updates banner input value on change', () => {
    renderWithRematchStore(<BannerForm />, store);

    const bannerInput = screen.getByTestId('banner-input') as HTMLInputElement;
    const file = new File(['test'], 'banner.png', { type: 'image/png' });

    const dataTransfer = new MockDataTransfer();
    dataTransfer.add({ kind: 'file', getAsFile: () => file });

    fireEvent.change(bannerInput, { target: { files: dataTransfer.files } });
    expect(bannerInput.files[0]).toStrictEqual(file);
    expect(bannerInput.files).toHaveLength(1);
  });
});
