import { useRef, useEffect, Fragment } from 'react';
import { Dispatch, RootState } from '@/store';
import WaveSurfer from 'wavesurfer.js';
import { formWaveSurferOptions } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Grid, GridItem, IconButton } from '@chakra-ui/react';
import { VolumeSlider, TrackDetails, PlayerButtons, DesktopQueue } from '@/modules/audio/pages/desktop/components';

const DesktopAudio = () => {
  const dispatch = useDispatch<Dispatch>();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>();
  const audioData = useSelector((state: RootState) => state.audioModel);

  useEffect(() => {
    dispatch.audioModel.setIsLoading(true);
    var options; // wavesurfer params
    if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
    if (options) wavesurfer.current = WaveSurfer.create(options);
    wavesurfer?.current?.load(audioData?.queue?.[0]?.audio);
    wavesurfer?.current?.on('ready', () => {
      dispatch.audioModel.setIsLoading(false);
    });
    return () => {
      wavesurfer.current.destroy();
    };
  }, [audioData.queue]);

  return (
    <Fragment>
      <DesktopQueue />
      <Grid className="animate__animated animate__fadeInUp" display={{ base: 'none', lg: 'grid' }} height="6rem" templateColumns="repeat(24, 1fr)">
        <GridItem colSpan={4} bg="gray.200">
          <TrackDetails />
        </GridItem>
        <GridItem colSpan={2}>
          <PlayerButtons wavesurfer={wavesurfer} />
        </GridItem>
        <GridItem colSpan={14}>
          <Flex alignItems={'center'} justifyContent={'center'} height="100%" bg="gray.200" w="full">
            <div id="waveform-global" className="flex-shrink-0 flex-grow-0 mx-2 w-[90%]" ref={waveformRef} />
          </Flex>
        </GridItem>
        <GridItem colSpan={1} bg="gray.200">
          <Flex h='full' alignItems={'center'} justifyContent={'center'}>
            <IconButton
              onClick={() => dispatch.audioModel.setIsShowingQueue(!audioData?.isShowingQueue)}
              aria-label="queue"
              icon={<i className="fa-solid fa-layer-group"></i>}
              className="hover:scale-125"
              _hover={{ bg: 'gray.200' }}
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={3} bg="gray.200">
          <VolumeSlider wavesurfer={wavesurfer} />
        </GridItem>
      </Grid>
    </Fragment>
  );
};

export default DesktopAudio;
