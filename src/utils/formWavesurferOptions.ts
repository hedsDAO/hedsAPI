import { WaveSurferParams } from 'wavesurfer.js/types/params';

const formWaveSurferOptions = (ref: HTMLDivElement): WaveSurferParams => ({
  container: ref,
  waveColor: '#323232',
  progressColor: '#C025D3',
  cursorColor: 'transparent',
  barWidth: 0.5,
  barRadius: 0,
  responsive: true,
  height: 40,
  normalize: true,
  hideScrollbar: true,
});

export default formWaveSurferOptions;
