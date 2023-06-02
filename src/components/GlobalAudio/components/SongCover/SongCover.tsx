import { Dispatch, store } from '@/store';
import { AspectRatio, Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from '@/components/GlobalAudio/components/SongCover/styles';

/**
 * @function SongCover
 * @description A component that displays the cover image of the current song with a skeleton before loading.
 * @returns {JSX.Element} - Rendered SongCover component.
 */
export const SongCover = () => {
  const dispatch = useDispatch<Dispatch>();
  const isMinimized = useSelector(store.select.globalAudioModel.selectIsMinimized);
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const cover = useSelector(store.select.audioModel.selectCover);

  return (
    <AspectRatio {...styles.$songCoverAspectRatioStyles}>
      <Skeleton {...styles.$songCoverSkeletonStyles(hasImageLoaded)}>
        <Image
          role={isMinimized ? 'button' : 'img'}
          pointerEvents={isMinimized ? 'auto' : 'none'}
          onClick={() => (isMinimized ? dispatch.globalAudioModel.setIsMinimized(false) : null)}
          onLoad={setHasImageLoaded.on}
          src={cover}
          {...styles.$songCoverImageStyles}
        />
      </Skeleton>
    </AspectRatio>
  );
};
