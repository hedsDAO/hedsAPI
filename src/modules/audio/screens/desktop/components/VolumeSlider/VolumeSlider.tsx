import { RootState } from '@/store';
import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const VolumeSlider = () => {
  const audioData = useSelector((state: RootState) => state.audioModel);
  return (
    <Flex h="full" alignItems={'center'} gap={2} px={8}>
      <i className="fa-sharp fa-solid fa-volume-high"></i>
      <Slider aria-label="slider-ex-1" defaultValue={audioData.volume}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
};

export default VolumeSlider;
