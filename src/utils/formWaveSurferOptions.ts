import { WaveSurferParams } from 'wavesurfer.js/types/params';

const formWaveSurferOptions = (ref: any): WaveSurferParams => ({
  container: ref,
  waveColor: '#1F1C2660',
  progressColor: '#AC8FFF',
  cursorColor: 'transparent',
  barWidth: 4,
  barRadius: 0,
  responsive: true,
  height: 160,
  normalize: true,
  hideScrollbar: true,
});

export default formWaveSurferOptions;
