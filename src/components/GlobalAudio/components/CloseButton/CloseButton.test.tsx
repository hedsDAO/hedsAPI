import { CloseButton } from '@/components/GlobalAudio/components/CloseButton/CloseButton';
import { render, screen, fireEvent } from '@testing-library/react';

describe('CloseButton unit', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    render(<CloseButton handleClose={handleClose} />);
  });

  it('renders the close button', () => {
    const closeButton = screen.getByTestId('ga-close-button');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls handleClose when the close button is clicked', () => {
    const closeButton = screen.getByTestId('ga-close-button');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});