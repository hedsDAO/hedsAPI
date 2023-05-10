import { Details } from '@/pages/song/components/Details/Details';
import { store } from '@/store';
import { songModelState } from '@/tests/mocks/models/songModelState';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { act, screen } from '@testing-library/react';
import { ATTRIBUTES_HEADING, MOOD_SPECTROGRAM_HEADING, RECENT_HEADING } from '../../models/constants';
import MockRadialChart from '@/tests/mocks/common/MockRadialChart';

// mocked: window resize observer required in RadialChart not in testing DOM
jest.mock('@/common/charts/RadialChart/RadialChart', () => ({
  __esModule: true,
  default: () => <MockRadialChart />,
}));

describe('Details unit', () => {
  beforeEach(() => {
    store.dispatch.songModel.setState(songModelState);
    renderWithRematchStore(<Details />, store);
  });

  it('renders the main headings', () => {
    const recentHeading = screen.getByTestId('song-recent-heading');
    const attributesHeading = screen.getByTestId('song-attributes-heading');
    const moodSpectrogramHeading = screen.getByTestId('song-mood-heading');

    expect(recentHeading).toHaveTextContent(RECENT_HEADING);
    expect(attributesHeading).toHaveTextContent(ATTRIBUTES_HEADING);
    expect(moodSpectrogramHeading).toHaveTextContent(MOOD_SPECTROGRAM_HEADING);
  });

  it('renders the correct number of empty events', () => {
    act(() => {
      store.dispatch.songModel.setSongEvents([]);
    });
    const emptyEvent1 = screen.getByTestId('empty-event-0');
    const emptyEvent2 = screen.getByTestId('empty-event-1');
    const emptyEvent3 = screen.getByTestId('empty-event-2');
    expect(emptyEvent1).toBeInTheDocument();
    expect(emptyEvent2).toBeInTheDocument();
    expect(emptyEvent3).toBeInTheDocument();
  });

  it('does not render the radial chart when mood data is not available', async () => {
    const radialChart = screen.queryByTestId('mock-radial-chart');
    expect(radialChart).toBeInTheDocument();
    act(() => {
      store.dispatch.songModel.setCyaniteData({ mood: null });
    });
    expect(radialChart).not.toBeInTheDocument();
  });
});
