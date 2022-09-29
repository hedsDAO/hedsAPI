import { screen, render } from '@testing-library/react';
import { userData } from '@/modules/user/page/tests/mocks/UserData';
import { UserSubmissions } from '@/modules/user/components';

describe('Twitter link button component', () => {
  it('renders correct twitter link', () => {
    render(<UserSubmissions loading={false} userData={userData} />);
    const userSubmissions = screen.queryByTestId('user-submissions');
    const { submissions } = userData;
    if (!submissions) expect(userSubmissions).toBeEmptyDOMElement();
    else Object.values(submissions.heds.hedstape).map((sub) => expect(userSubmissions).toHaveTextContent(sub.track));
  });
});
