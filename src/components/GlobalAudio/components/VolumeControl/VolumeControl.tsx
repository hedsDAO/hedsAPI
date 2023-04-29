import { useEffect } from 'react';
import { store } from '@/store';
import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useBoolean } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';

export const VolumeControl = ({ handleVolume, handleMute }: { handleVolume: (e: number) => void; handleMute: (e: boolean) => void }) => {
  const [isHoverVolume, setIsHoverVolume] = useBoolean(false);
  const volumeBoxControls = useAnimation();
  const MotionBox = motion.div;
  const volume = useSelector(store.select.globalAudioModel.selectVolume);
  const isMuted = useSelector(store.select.globalAudioModel.selectIsMuted);

  useEffect(() => {
    volumeBoxControls.start({
      opacity: isHoverVolume ? 1 : 0,
      width: isHoverVolume ? '100%' : '0px',
      transition: { duration: 0.35 },
    });
  }, [isHoverVolume, volumeBoxControls]);

  return (
    <Flex onMouseLeave={setIsHoverVolume.off} onMouseEnter={setIsHoverVolume.on} gap={1} alignContent={'center'} w="full" mr={10}>
      <Text
        minW="22px"
        pointerEvents={'auto'}
        role="button"
        onClick={() => {
          if (isMuted) {
            handleMute(false);
            for (let i = 0; i <= 100; i++) handleVolume(i);
          } else {
            handleMute(true);
            for (let i = 100; i >= 0; i--) handleVolume(i);
          }
        }}
        mt={'5px !important'}
        fontSize="md"
        as={'i'}
        mr={'-2px !important'}
        className={volume === 0 || isMuted ? 'fas fa-volume-xmark' : 'fa-solid fa-volume'}
        color="white"
      />
      <MotionBox animate={volumeBoxControls} transition={{ type: 'spring', damping: 0, stiffness: 100 }}>
        <Slider ml={1} mt={'-1 !important'} size="sm" value={volume * 100} defaultValue={volume * 100} onChange={(val: number) => handleVolume(val)}>
          <SliderTrack bg="heds.500">
            <SliderFilledTrack bg="heds.100" />
          </SliderTrack>
          <SliderThumb _focus={{ boxShadow: 'none', outlineColor: 'transparent' }} />
        </Slider>
      </MotionBox>
    </Flex>
  );
};
