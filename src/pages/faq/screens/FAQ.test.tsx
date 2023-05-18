import { render, screen } from '@testing-library/react';
import { FAQ } from './FAQ';

describe('FAQ', () => {
  it('renders the FAQ component', () => {
    render(<FAQ />);
    const heading = screen.getByRole('heading', { name: /frequently asked questions/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all FAQ items', () => {
    render(<FAQ />);
    const faqItems = screen.getAllByRole('button');
    expect(faqItems.length).toBe(3);
  });
});
