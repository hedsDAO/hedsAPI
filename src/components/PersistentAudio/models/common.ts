import Wavesurfer from 'wavesurfer.js';

export interface PersistentAudioState {
  src: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShowingOverlay: boolean;
  isLoading: boolean;
  wavesurfer: Wavesurfer;
}
