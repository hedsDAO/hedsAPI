import { render, screen } from '@testing-library/react';
import { Song } from '@/pages/songPage/screens/Song';

describe('Song Page', () => {
  test('renders the title', () => {
    render(<Song />);
    const title = screen.getByText(/song page/i);
    expect(title).toBeInTheDocument();
  });
});
