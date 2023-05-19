import { render, act, screen, within } from '@testing-library/react';
import { Countdown } from './Countdown';

jest.useFakeTimers();

describe('Countdown', () => {
  it('renders and updates the countdown', async () => {
    const futureTime = Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 4 * 60 * 1000 + 5 * 1000;

    render(<Countdown epochTime={futureTime} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const daysBox = screen.getByText('DAYS').parentElement;
    const hoursBox = screen.getByText('HRS').parentElement;
    const minutesBox = screen.getByText('MIN').parentElement;
    const secondsBox = screen.getByText('SEC').parentElement;

    if (daysBox && hoursBox && minutesBox && secondsBox) {
      expect(within(daysBox).getByText('02')).toBeInTheDocument();
      expect(within(hoursBox).getByText('03')).toBeInTheDocument();
      expect(within(minutesBox).getByText('04')).toBeInTheDocument();
      // A second went down
      expect(within(secondsBox).getByText('04')).toBeInTheDocument();
    }
  });
});
