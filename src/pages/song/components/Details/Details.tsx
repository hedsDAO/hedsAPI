import { useSelector } from 'react-redux';
import RadialChart from '@/common/charts/RadialChart/RadialChart';
import SongEvent from '@/common/events/SongEvent';
import { store } from '@/store';
import { formatCyaniteGenres, formatCyaniteKeys, formatCyaniteSubGenres } from '@/utils';
import { Box, Flex, Grid, GridItem, SimpleGrid, Skeleton, Stack, Text } from '@chakra-ui/react';
import { Attribute } from '@pages/song/components/Attribute/Attribute';
import * as styles from '@pages/song/components/Details/styles';
import * as constants from '@pages/song/models/constants';

/**
 * @function Details
 * @description Renders a component displaying song details including recent events, attributes, and a mood spectrogram.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Details = () => {
  const cyaniteData = useSelector(store.select.songModel.selectCyaniteData);
  const songEvents = useSelector(store.select.songModel.selectSongEvents);
  const numberOfAttributes = useSelector(store.select.songModel.selectNumberOfAttributes);
  const isLoading = useSelector(store.select.songModel.selectIsLoading);
  const songHash = useSelector(store.select.songModel.selectSongHash);
  const handleAttributeEmptyStates = (): number => {
    return numberOfAttributes < 8 ? 8 - numberOfAttributes : 0;
  };
  const handleEventEmptyStates = (): number => {
    return songEvents?.length < 3 ? 3 - songEvents?.length : 0;
  };

  return (
    <SimpleGrid {...styles.$simpleGridStyles}>
      <GridItem {...styles.$gridItemStyles}>
        <Stack {...styles.$stackStyles}>
          <Text {...styles.$sectionTitleStyles('song-recent-heading')}>{constants.RECENT_HEADING}</Text>
          <Stack {...styles.$stackInnerStyles}>
            {songEvents?.slice(0, 3)?.map((event) => (
              <Skeleton key={event?.event_timestamp + event?.id} {...styles.$skeletonSongEventStyles(isLoading)}>
                <SongEvent {...event} />
              </Skeleton>
            ))}
            {Array.from(Array(handleEventEmptyStates()).keys()).map((index: number) => (
              <Skeleton key={index + 'events'} fitContent {...styles.$skeletonEmptyEventStyles(isLoading)}>
                <Flex {...styles.$emptyEventStyles(index)}></Flex>
              </Skeleton>
            ))}
          </Stack>
        </Stack>
      </GridItem>
      <GridItem {...styles.$gridItemStyles}>
        <Stack {...styles.$stackStyles}>
          <Text {...styles.$sectionTitleStyles('song-attributes-heading')}>{constants.ATTRIBUTES_HEADING}</Text>
          <Grid {...styles.$attributesGridStyles}>
            <Skeleton {...styles.$skeletonAttributeStyles(isLoading)}>
              <Attribute name={constants.DETAILS_TEXT_KEY} description={formatCyaniteKeys(cyaniteData?.keyPrediction?.value)} />
            </Skeleton>
            <Skeleton {...styles.$skeletonAttributeStyles(isLoading)}>
              <Attribute name={constants.DETAILS_TEXT_TIME_SIGNATURE} description={cyaniteData?.timeSignature} />
            </Skeleton>
            {cyaniteData?.genreTags?.map((genre: string, i: number) => (
              <Skeleton key={genre + songHash + i} {...styles.$skeletonAttributeStyles(isLoading)}>
                <Attribute name={constants.DETAILS_TEXT_GENRE} description={formatCyaniteGenres(genre)} />
              </Skeleton>
            ))}
            {cyaniteData?.subgenreTags?.map((subgenre: string, i: number) => (
              <Skeleton key={subgenre + songHash + i} {...styles.$skeletonAttributeStyles(isLoading)}>
                <Attribute name={constants.DETAILS_TEXT_SUBGENRE} description={formatCyaniteSubGenres(subgenre)} />
              </Skeleton>
            ))}
            {handleAttributeEmptyStates() > 0 &&
              new Array(handleAttributeEmptyStates()).fill(0).map((_, index) => (
                <Skeleton key={index} {...styles.$skeletonAttributeEmptyStyles(isLoading)}>
                  <Box {...styles.$attributeEmptyBoxStyles}></Box>
                </Skeleton>
              ))}
          </Grid>
        </Stack>
      </GridItem>
      <GridItem {...styles.$gridItemStyles}>
        <Stack {...styles.$stackStyles}>
          <Text {...styles.$sectionTitleStyles('song-mood-heading')}>{constants.MOOD_SPECTROGRAM_HEADING}</Text>
          {cyaniteData?.mood && (
            <Box data-testid="radial-chart">
              <RadialChart data={cyaniteData?.mood} />
            </Box>
          )}
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};
