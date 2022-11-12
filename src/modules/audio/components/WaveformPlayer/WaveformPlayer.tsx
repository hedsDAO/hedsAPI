import { useEffect, useRef, useState } from 'react';
import { formWaveSurferOptions, isEmpty } from '@/utils';
import WaveSurfer from 'wavesurfer.js';
import { Button, Grid, GridItem } from '@chakra-ui/react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';

const WaveformPlayer = ({ audio }: { audio?: File }) => {
  const dispatch = useDispatch<Dispatch>();
  const { isLoading } = useSelector((state: RootState) => state.submitModel);
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>();

  useEffect(() => {
    if (audio) {
      dispatch.submitModel.setIsLoading(true);
      var options; // wavesurfer params
      if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
      if (options) wavesurfer.current = WaveSurfer.create(options);
      if (audio) wavesurfer?.current?.loadBlob(audio);
      wavesurfer?.current?.on('ready', () => dispatch.submitModel.setIsLoading(false));
      wavesurfer?.current?.on('finish', () => {});
    }
    return () => {
      if (wavesurfer?.current) {
        wavesurfer.current.destroy();
        waveformRef.current = null;
      }
    };
  }, [audio]);

  return (
    <Grid gap={2} alignItems={'center'} templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={1}>
        <Button
          rounded={'full'}
          bg="transparent"
          borderColor={'transparent'}
          _hover={{ bg: 'transparent' }}
          size="xs"
          onClick={() => {
            wavesurfer?.current?.playPause();
            setIsPlaying(!isPlaying);
          }}
        >
          {isLoading ? (
            <i className="fas fa-circle-notch fa-spin text-black" />
          ) : isPlaying ? (
            <PauseIcon height={'12'} width={'12'} />
          ) : (
            <PlayIcon height={'12'} width={'12'} />
          )}
        </Button>
      </GridItem>
      <GridItem colSpan={11}>
        <div ref={waveformRef} className={'w-full'}></div>
      </GridItem>
    </Grid>
  );
};

export default WaveformPlayer;
