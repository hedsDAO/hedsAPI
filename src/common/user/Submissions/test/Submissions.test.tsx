import { screen } from '@testing-library/react';
import { store } from '@/store';
import { Submissions } from '@/common/user';
import { userData } from '@/tests/mocks/UserData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { formatTime } from '@/utils';

describe('Submissions Unit', () => {
  beforeAll(() => store.dispatch.userModel.setUserData(userData));
  beforeEach(() =>
    renderWithRematchStore(
      <Router>
        <Submissions />
      </Router>,
      store,
    ),
  );
  it('renders submissions', () => {
    const userSubmissions = screen.getByTestId('user-submissions');
    expect(userSubmissions).toBeTruthy();
  });
  it('renders correct submission info', () => {
    const userSubmissions = screen.getByTestId('user-submissions');
    const firstKey = Object.keys(userData.submissions.heds.hedstape)[0];
    const firstSubmissions = userData.submissions.heds.hedstape[firstKey];
    expect(userSubmissions).toHaveTextContent(firstSubmissions.track);
    expect(userSubmissions).toHaveTextContent(formatTime(firstSubmissions.duration));
  });
});
