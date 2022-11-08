import { TrackMetadata } from '@/models/common';
import { useEffect, useRef, useState } from 'react';
import { formWaveSurferOptions, isEmpty } from '@/utils';
import WaveSurfer from 'wavesurfer.js';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons';

const WaveformPlayer = ({ track }: { track?: TrackMetadata }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>();

  useEffect(() => {
    if (!isEmpty(track)) {
      var options; // wavesurfer params
      if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
      if (options) wavesurfer.current = WaveSurfer.create(options);
      wavesurfer?.current?.load(track.audio);
      wavesurfer?.current?.on('ready', () => {});
      wavesurfer?.current?.on('finish', () => {});
    }
    return () => {
      if (wavesurfer?.current) {
        wavesurfer.current.destroy();
        waveformRef.current = null;
      }
    };
  }, [track]);

  return (
    <Grid gap={2} alignItems={'center'} templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={1}>
        <Button
          bg="gray.300"
          borderColor={'gray.400'}
          _hover={{ bg: 'gray.200', borderColor: 'gray.500' }}
          size="xs"
          onClick={() => {
            wavesurfer?.current?.playPause();
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? <IconPlayerPause height={'10'} width={'10'} /> : <IconPlayerPlay height={'10'} width={'10'} />}
        </Button>
      </GridItem>
      <GridItem colSpan={11}>
        <div ref={waveformRef} className="w-full"></div>
      </GridItem>
    </Grid>
  );
};

export default WaveformPlayer;
