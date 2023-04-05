import { WaveSurferParams } from 'wavesurfer.js/types/params';

const formWaveSurferOptions = (id: string): WaveSurferParams => ({
  container: id,
  waveColor: '#E0E0E0',
  progressColor: '#0E1117',
  cursorColor: 'transparent',
  barWidth: 4,
  barRadius: 0,
  responsive: true,
  height: 160,
  normalize: true,
  hideScrollbar: true,
});

export default formWaveSurferOptions;
