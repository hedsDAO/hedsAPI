import { screen, render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { Tracks } from './Tracks';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Tracks component', () => {
  const mockTracks = [
    { id: 1, cover: 'cover1.jpg', track_name: 'Track', artist_display_name: 'Artist 1' },
    { id: 2, cover: 'cover2.jpg', track_name: 'Track 2', artist_display_name: 'Artist 2' },
    { id: 3, cover: 'cover3.jpg', track_name: 'Track 3', artist_display_name: 'Artist 3' },
  ];

  it('renders the correct number of tracks', () => {
    (useSelector as jest.Mock).mockReturnValue(mockTracks);
    const { getAllByTestId } = render(<Tracks />);
    const trackElements = getAllByTestId('track-box');
    expect(trackElements.length).toBe(mockTracks.length);
  });

  it('renders the correct track name and display name', () => {
    (useSelector as jest.Mock).mockReturnValue(mockTracks);
    render(<Tracks />);
    const trackName = screen.getByText(mockTracks[0].track_name);
    expect(trackName).toBeInTheDocument();

    const displayName = screen.getByText(mockTracks[0].artist_display_name);
    expect(displayName).toBeInTheDocument();
  });
});
