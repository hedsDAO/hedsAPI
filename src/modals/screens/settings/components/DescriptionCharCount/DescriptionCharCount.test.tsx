import { DescriptionCharCount } from '@/modals/screens/settings/components/DescriptionCharCount/DescriptionCharCount';
import { store } from '@/store';
import { user } from '@/tests/mocks/data/user';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { screen, act } from '@testing-library/react';

describe('DescriptionCharCount unit', () => {
  beforeEach(() => {
    store.dispatch.settingsModel.setUserData(user);
    store.dispatch.settingsModel.setDescCharacters(user?.description?.length || 0);
    store.dispatch.settingsModel.setDescriptionError('');
    renderWithRematchStore(<DescriptionCharCount />, store);
  });

  it('renders the character count of the description', () => {
    const description = store.select.settingsModel.selectDescription(store.getState());
    const descCharacters = store.select.settingsModel.selectDescCharacters(store.getState());
    const charCount = screen.getByText(descCharacters || description?.length);
    expect(charCount).toBeInTheDocument();
  });

  it('renders the max character count', () => {
    const maxCharCount = screen.getByText('130');
    expect(maxCharCount).toBeInTheDocument();
  });

  it('displays the error message if descriptionError exists', () => {
    act(() => {
      store.dispatch.settingsModel.setDescriptionError('Some error message');
    });
    let descriptionError = screen.getByTestId('desc-count-error');
    expect(descriptionError).toBeInTheDocument();
  });

  it('does not display an error message if descriptionError is empty or does not exist', () => {
    act(() => {
      store.dispatch.settingsModel.setDescriptionError('');
    });
    const descriptionError = screen.queryByText('Some error message');
    expect(descriptionError).not.toBeInTheDocument();
  });
});
