import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useBoolean } from '@chakra-ui/react';
import * as styles from '@/components/GlobalAudio/components/VolumeControl/styles';

/**
 * @function VolumeControl
 * @param {Object} props - The VolumeControl component props.
 * @param {Function} handleVolume - The function to be called to handle the volume change.
 * @param {Function} handleMute - The function to be called to handle mute/unmute.
 * @description A volume control component that displays a volume slider and a mute/unmute button.
 * @returns {JSX.Element} - Rendered VolumeControl component.
 */
export const VolumeControl = ({ handleVolume, handleMute }: { handleVolume: (e: number) => void; handleMute: () => void }) => {
  const [isHoverVolume, setIsHoverVolume] = useBoolean(false);
  const volumeBoxControls = useAnimation();
  const volume = useSelector(store.select.globalAudioModel.selectVolume);
  const isMuted = useSelector(store.select.globalAudioModel.selectIsMuted);
  const MotionBox = motion.div;

  useEffect(() => {
    volumeBoxControls.start({
      opacity: isHoverVolume ? 1 : 0,
      width: isHoverVolume ? '100%' : '0px',
      transition: { duration: 0.35 },
    });
  }, [isHoverVolume, volumeBoxControls]);

  return (
    <Flex {...styles.$volumeControlFlexStyles} onMouseLeave={setIsHoverVolume.off} onMouseEnter={setIsHoverVolume.on}>
      <Text {...styles.$volumeIconTextStyles(handleMute, volume, isMuted)} />
      <MotionBox animate={volumeBoxControls} transition={{ type: 'spring', damping: 0, stiffness: 100 }}>
        <Slider onChange={(val: number) => handleVolume(val / 100)} defaultValue={100} {...styles.$volumeControlSliderStyles(volume * 100 || 0, volume * 100 || 0)}>
          <SliderTrack {...styles.$volumeControlSliderTrackStyles}>
            <SliderFilledTrack {...styles.$volumeControlSliderFilledTrackStyles} />
          </SliderTrack>
          <SliderThumb {...styles.$volumeControlSliderThumbStyles} />
        </Slider>
      </MotionBox>
    </Flex>
  );
};
