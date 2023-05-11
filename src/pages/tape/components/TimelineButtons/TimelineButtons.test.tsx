import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { TimelineButtons } from './TimelineButtons';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('TimelineButtons component', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

  it('renders the submit button when cycle is "submit"', () => {
    (useSelector as jest.Mock).mockReturnValueOnce({
      submit: { start: 0 },
      vote: { start: 0 },
      mint: { start: 0 },
      cycle: 'submit',
    });

    const { getByText } = render(<TimelineButtons />);

    // the button should not be disabled
    const submitButton = getByText('UPLOAD SUBMISSION');
    expect(submitButton.closest('button')).toHaveAttribute('disabled', '');

    const voteButton = getByText('VOTE NOW');
    expect(voteButton.closest('button')).toHaveAttribute('disabled');

    // mint button is rendering correct text
    const mintButton = getByText('GET NOTIFIED');
    expect(mintButton).toBeInTheDocument();
  });

  it('renders the vote button when cycle is "vote"', () => {
    (useSelector as jest.Mock).mockReturnValueOnce({
      submit: { start: 0 },
      vote: { start: 0 },
      mint: { start: 0 },
      cycle: 'vote',
    });

    const { getByText } = render(<TimelineButtons />);

    const voteButton = getByText('VOTE NOW');
    expect(voteButton.closest('button')).toHaveAttribute('disabled', '');
    const submitButton = getByText('UPLOAD SUBMISSION');
    expect(submitButton.closest('button')).toHaveAttribute('disabled');

    // mint button is rendering correct text
    const mintButton = getByText('GET NOTIFIED');
    expect(mintButton).toBeInTheDocument();
  });
});
