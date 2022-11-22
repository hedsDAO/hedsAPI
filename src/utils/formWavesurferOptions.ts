import { WaveSurferParams } from 'wavesurfer.js/types/params';

const formWaveSurferOptions = (ref: HTMLDivElement): WaveSurferParams => ({
  container: ref,
  waveColor: '#000000',
  progressColor: '#C025D3',
  cursorColor: 'transparent',
  barWidth: 1,
  barRadius: 0,
  responsive: true,
  height: 60,
  normalize: true,
  hideScrollbar: true,
});

export default formWaveSurferOptions;
