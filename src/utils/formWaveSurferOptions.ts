import { WaveSurferParams } from 'wavesurfer.js/types/params';

const formWaveSurferOptions = (ref: any): WaveSurferParams => ({
  container: ref,
  waveColor: '#E0E0E0',
  progressColor: '#0E1117',
  cursorColor: 'transparent',
  barWidth: 4,
  barRadius: 0,
  responsive: true,
  height: 20,
  normalize: true,
  hideScrollbar: true,
});

export default formWaveSurferOptions;
