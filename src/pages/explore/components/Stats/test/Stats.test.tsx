import { screen } from '@testing-library/react';
import { Stats } from '@/pages/explore/components';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { store } from '@/store';
import { STATS_DATA } from '@/pages/explore/store/constants';

describe('Status Unit', () => {
  beforeEach(() => renderWithRematchStore(<Stats />, store));

  it('renders properly', () => {
    expect(screen.getByTestId('explore-stats')).toBeInTheDocument();
  });

  it('displays all headers and values', () => {
    const statsContainer = screen.getByTestId('explore-stats');
    STATS_DATA.forEach(({ label, value }) => {
      expect(statsContainer).toHaveTextContent(label);
      expect(statsContainer).toHaveTextContent(value);
    });
  });
});
