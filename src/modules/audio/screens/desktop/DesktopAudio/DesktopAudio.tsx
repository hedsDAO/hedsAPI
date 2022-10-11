import { useRef, useEffect } from 'react';
import { RootState } from '@/store';
import WaveSurfer from 'wavesurfer.js';
import { formWaveSurferOptions } from '@/utils';
import { useSelector } from 'react-redux';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { VolumeSlider, TrackDetails, PlayerButtons, DesktopQueue } from '@/modules/audio/screens/desktop/components';

const DesktopAudio = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>();
  const audioData = useSelector((state: RootState) => state.audioModel);

  useEffect(() => {
    var options; // wavesurfer params
    if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
    if (options) wavesurfer.current = WaveSurfer.create(options);
    wavesurfer?.current?.load(audioData?.queue?.[0]?.audio);
  }, []);

  return (
    <Grid display={{ base: 'none', lg: 'grid' }} height="6rem" templateColumns="repeat(24, 1fr)">
      <GridItem colSpan={4} bg="gray.200">
        <TrackDetails />
      </GridItem>
      <GridItem colSpan={2}>
        <PlayerButtons />
      </GridItem>
      <GridItem colSpan={14}>
        <Flex alignItems={'center'} justifyContent={'center'} height="100%" bg="gray.200" w="full">
          <div id="waveform-global" className="flex-shrink-0 flex-grow-0 mx-2 w-[90%]" ref={waveformRef} />
        </Flex>
      </GridItem>
      <GridItem colSpan={1} bg="gray.200">
        <DesktopQueue />
      </GridItem>
      <GridItem colSpan={3} bg="gray.200">
        <VolumeSlider />
      </GridItem>
    </Grid>
  );
};

export default DesktopAudio;
