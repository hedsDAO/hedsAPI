import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { TapeDetails } from './TapeDetails';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('TapeDetails', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

  it('renders the tape details correctly', () => {
    // Mock the useSelector hook to provide sample data
    const mockTape = {
      name: 'Sample Tape',
      sampleArtists: [
        { id: 1, profile_picture: 'artist1.jpg', display_name: 'Artist 1' },
        { id: 2, profile_picture: 'artist2.jpg', display_name: 'Artist 2' },
        { id: 3, profile_picture: 'artist3.jpg', display_name: 'Artist 3' },
      ],
      description: 'This is a sample tape description.',
    };
    (useSelector as jest.Mock).mockReturnValue(mockTape);

    // Render the component
    const { getByText, getAllByText } = render(<TapeDetails />);

    // Verify the tape details are rendered correctly
    const tapeName = getByText('Sample Tape');
    expect(tapeName).toBeInTheDocument();

    const artistAvatars = getAllByText(/Artist/i);
    expect(artistAvatars.length).toBe(mockTape.sampleArtists.length);

    const tapeDescription = getByText('This is a sample tape description.');
    expect(tapeDescription).toBeInTheDocument();
  });
});
