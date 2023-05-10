import { render, screen } from '@testing-library/react';
import { FAQPage } from './FAQ';

describe('FAQPage', () => {
  it('renders the FAQPage component', () => {
    render(<FAQPage />);
    const heading = screen.getByRole('heading', { name: /frequently asked questions/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all FAQ items', () => {
    render(<FAQPage />);
    const faqItems = screen.getAllByRole('button');
    expect(faqItems.length).toBe(3);
  });
});
