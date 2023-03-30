import { WaveSurferParams } from 'wavesurfer.js/types/params';

const formWaveSurferOptions = (id: string): WaveSurferParams => ({
  container: id,
  waveColor: '#6C7077',
  progressColor: '#0E1117',
  cursorColor: 'transparent',
  barWidth: 3,
  barRadius: 2,
  responsive: true,
  height: 160,
  normalize: true,
  hideScrollbar: true,
});

export default formWaveSurferOptions;
