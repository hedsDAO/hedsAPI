import { VolumeControl } from '@/components/GlobalAudio/components/VolumeControl/VolumeControl';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '@/store';
import { globalAudioModelState } from '@/tests/mocks/models/globalAudioModelState';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';

describe('VolumeControl unit', () => {
  const handleVolumeMock = jest.fn();
  const handleMuteMock = jest.fn();

  beforeEach(() => {
    store.dispatch.globalAudioModel.setState(globalAudioModelState);
    renderWithRematchStore(<VolumeControl handleVolume={handleVolumeMock} handleMute={handleMuteMock} />, store);
  });

  it('renders the volume icon', () => {
    const volumeIcon = screen.getByRole('button');
    expect(volumeIcon).toBeInTheDocument();
  });

  it('displays the volume slider when hovering', () => {
    const volumeControl = screen.getByRole('button');
    fireEvent.mouseEnter(volumeControl);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });
});
