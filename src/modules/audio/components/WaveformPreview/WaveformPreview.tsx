import { Fragment, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { formWaveSurferOptions } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TrackMetadata } from '@/models/common';
import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { WaveSurferParams } from 'wavesurfer.js/types/params';

export const WaveformPreview = ({ userData }: { userData: TrackMetadata }) => {
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>();
  const audioData = useSelector((state: RootState) => state.audioModel);
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#191919',
      progressColor: '#424242',
      cursorColor: 'transparent',
      barWidth: 0,
      barRadius: 0,
      responsive: true,
      height: 40,
      normalize: true,
      hideScrollbar: true,
    });
    if (userData?.audio) wavesurfer?.current?.load(userData?.audio);
    wavesurfer?.current?.on('ready', () => {
      //   wavesurfer?.current?.drawBuffer();
    });
    wavesurfer?.current?.on('finish', () => {
      wavesurfer.current.destroy();
    });
    return () => {
      wavesurfer.current.destroy();
    };
  }, [userData]);
  return (
    <Fragment>
      <Flex opacity={'50%'} mx="auto" maxW={'7xl'} alignItems={'center'} justifyContent={'center'} height="100%" w="full">
        <div id="waveform-global" className="flex-shrink-0 flex-grow-0 mx-2 w-[90%]" ref={waveformRef} />
      </Flex>
    </Fragment>
  );
};
