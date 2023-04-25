import { render, cleanup, screen } from '@testing-library/react';
import { NotFound } from '@/pages/404/screens/NotFound';

afterEach(cleanup);

describe('NotFound component', () => {
  it('renders the NotFound component with two 4s and an image', () => {
    const { container } = render(<NotFound />);

    // Check if two 4s are rendered
    const fours = screen.getAllByText('4');
    expect(fours.length).toBe(2);

    // Check if the image is rendered
    const hedImage = screen.getByAltText('Zero');
    expect(hedImage).toBeInTheDocument();

    // Check if the image has the correct src
    const imageSrc = container.querySelector('img')?.getAttribute('src');
    expect(imageSrc).toBe('test-file-stub');
  });
});
