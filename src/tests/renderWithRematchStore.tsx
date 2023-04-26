import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
export const renderWithRematchStore = (ui: React.ReactElement, store: any) => {
  return render(<Provider store={store}>{ui}</Provider>);
};
