import { selectAudioVolume } from '@/modules/audio/store/selectors';
import { Dispatch } from '@/store';
import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const VolumeSlider = ({ wavesurfer }: { wavesurfer: React.MutableRefObject<WaveSurfer> }) => {
  const dispatch = useDispatch<Dispatch>();
  const volume = useSelector(selectAudioVolume);
  return (
    <Flex h="full" alignItems={'center'} gap={2} px={9}>
      {volume < 25 ? (
        <i className="fa-sharp fa-solid fa-volume-off max-w-[2ch] min-w-[2ch]"></i>
      ) : volume < 50 ? (
        <i className="fa-sharp fa-solid fa-volume-low max-w-[2ch] min-w-[2ch]"></i>
      ) : volume < 75 ? (
        <i className="fa-sharp fa-solid fa-volume max-w-[2ch] min-w-[2ch]  -ml-[1.5px] mr-[1.5px]"></i>
      ) : (
        <i className="fa-sharp fa-solid fa-volume-high max-w-[2ch] min-w-[2ch]"></i>
      )}
      <Slider
        aria-label="slider-ex-1"
        defaultValue={volume}
        onChange={(e) => {
          dispatch.audioModel.setVolume(e);
          wavesurfer.current.setVolume(e * 0.01);
        }}
      >
        <SliderTrack rounded="sm" bg="gray.400">
          <SliderFilledTrack bg="gray.700" />
        </SliderTrack>
        <SliderThumb bg="gray.900" />
      </Slider>
    </Flex>
  );
};

export default VolumeSlider;
