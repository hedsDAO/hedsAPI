import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQItem } from './FAQItem';

const question = 'What is heds?';
const answer = 'heds is a decentralized audio-visual collective.';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('FAQItem', () => {
  it('renders the FAQItem component', () => {
    render(<FAQItem question={question} answer={answer} />);
    const questionText = screen.getByText(question);
    expect(questionText).toBeInTheDocument();
  });

  it('toggles answer visibility on click', async () => {
    render(<FAQItem question={question} answer={answer} />);
    const answerText = screen.queryByText(answer);
    expect(answerText).toBeInTheDocument();
    expect(answerText.parentElement.parentElement).toHaveStyle('display: none');

    const questionButton = screen.getByRole('button', { name: question });
    userEvent.click(questionButton);

    await waitFor(() => {
      expect(answerText.parentElement.parentElement).toHaveStyle('display: block');
    });

    userEvent.click(questionButton);

    await waitFor(() => {
      expect(answerText.parentElement.parentElement).toHaveStyle('display: none');
    });
  });
});
