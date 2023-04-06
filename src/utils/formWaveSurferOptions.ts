import { WaveSurferParams } from 'wavesurfer.js/types/params';

const formWaveSurferOptions = (id: string): WaveSurferParams => ({
  container: id,
  waveColor: '#4D4D4D',
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
