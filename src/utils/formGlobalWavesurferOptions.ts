import { WaveSurferParams } from 'wavesurfer.js/types/params';

const formGlobalWavesurferOptions = (ref: any): WaveSurferParams => ({
  container: ref,
  waveColor: '#E0E0E0',
  progressColor: '#0E1117',
  cursorColor: 'transparent',
  barWidth: 4,
  barRadius: 0,
  responsive: true,
  height: 0,
  normalize: true,
  hideScrollbar: true,
  pixelRatio: 1000,
});

export default formGlobalWavesurferOptions;
