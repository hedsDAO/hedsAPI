import { store } from '@/store';
import { AspectRatio, Box, GridItem, Image, SimpleGrid, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import * as styles from './styles';

/**
 * @function AppearsOn
 * @description Renders a component displaying the tapes that the song appears on.
 * @returns {JSX.Element} - Rendered component.
 **/

export const AppearsOn = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const tapeName = useSelector(store.select.songModel.selectTapeName);
  const songHash = useSelector(store.select.songModel.selectSongHash);
  const cover = useSelector(store.select.songModel.selectSongCover);

  return (
    <SimpleGrid {...styles.$appearsOnSimpleGridStyles}>
      <GridItem {...styles.$appearsOnGridItemStyles}>
        <Box {...styles.$appearsOnBoxStyles(false)}>
          <AspectRatio {...styles.$appearsOnAspectRatioStyles}>
            <Skeleton {...styles.$appearsOnSkeletonStyles} isLoaded={hasImageLoaded}>
              <Image onLoad={setHasImageLoaded.on} {...styles.$appearsOnImageStyles} src={cover} />
            </Skeleton>
          </AspectRatio>
          <Text {...styles.$appearsOnTextStyles}>{tapeName}</Text>
        </Box>
      </GridItem>
      {Array.from(Array(5).keys()).map((i) => (
        <GridItem key={songHash + i} {...styles.$appearsOnGridItemStyles}>
          <Box {...styles.$appearsOnBoxStyles(true)}>
            <AspectRatio {...styles.$appearsOnAspectRatioStyles}>
              <Skeleton {...styles.$appearsOnSkeletonStyles} isLoaded={hasImageLoaded}></Skeleton>
            </AspectRatio>
            <Text {...styles.$appearsOnTextStyles}></Text>
          </Box>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
