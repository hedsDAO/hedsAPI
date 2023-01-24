import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { CarouselWrapper } from '@/pages/explore/components';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/utils/testUtils';

describe('CarouselWrapper Unit', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    renderWithRematchStore(<CarouselWrapper />, store);
  });

  it('renders properly', () => {
    expect(screen.getByTestId('explore-wrapper')).toBeInTheDocument();
  });
});
