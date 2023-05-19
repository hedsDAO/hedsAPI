import { store } from '@/store';
import { AspectRatio, Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import * as styles from '@/components/GlobalAudio/components/SongCover/styles';

/**
 * @function SongCover
 * @description A component that displays the cover image of the current song with a skeleton before loading.
 * @returns {JSX.Element} - Rendered SongCover component.
 */
export const SongCover = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const cover = useSelector(store.select.audioModel.selectCover);

  return (
    <AspectRatio {...styles.$songCoverAspectRatioStyles}>
      <Skeleton {...styles.$songCoverSkeletonStyles(hasImageLoaded)}>
        <Image onLoad={setHasImageLoaded.on} src={cover} {...styles.$songCoverImageStyles} />
      </Skeleton>
    </AspectRatio>
  );
};
