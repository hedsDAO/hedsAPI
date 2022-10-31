import { screen, render } from '@testing-library/react';
import { userData } from '@/pages/profile/page/tests/mocks/UserData';
import { Submissions } from '@/common/user';

describe('Twitter link button component', () => {
  it('renders correct twitter link', () => {
    render(<Submissions />);
    const userSubmissions = screen.queryByTestId('user-submissions');
    const { submissions } = userData;
    if (!submissions) expect(userSubmissions).toBeEmptyDOMElement();
    else Object.values(submissions.heds.hedstape).map((sub) => expect(userSubmissions).toHaveTextContent(sub.track));
  });
});
