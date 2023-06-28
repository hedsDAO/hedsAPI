import { Fragment, useEffect } from 'react';
import { Configure, connectHits, Highlight, Index } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SpotlightSteps } from '@/modals/screens/spotlight/models/common';
import { Dispatch, store } from '@/store';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { CustomHitImage } from '@components/Search/components/CustomHitImage/CustomHitImage';
import { SongHitProps } from '@components/Search/models/common';
import * as styles from '@components/Search/components/SongHit/styles';
import * as constants from '@components/Search/models/constants';

/**
 * @function SpotlightSongHit
 * @description A component to display a hit for a song from search results.
 * @returns {JSX.Element} - A component rendering a list of song hits or an empty fragment.
 */

export const SpotlightSongHit = () => {
  return (
    <Index indexName={constants.SONG_INDEX}>
      <Configure hitsPerPage={5} />
      <SongHit />
    </Index>
  );
};

/**
 * @function CustomSongHit
 * @description A custom component to display a hit for a song from search results. On click, it navigates to the song's detail page.
 * @param {SongHitProps[]} hits - An array of search results for songs.
 * @returns {JSX.Element} - A component rendering a list of song hits or an empty fragment.
 */

const CustomSongHit = ({ hits }: { hits: SongHitProps[] }) => {
  const songHits = useSelector(store.select.spotlightModel.selectSearchSongHits);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (JSON.stringify(hits) !== JSON.stringify(songHits)) dispatch.spotlightModel.setSearchSongHits(hits);
  }, [hits, songHits, dispatch]);

  return (
    <Fragment>
      {hits?.length ? (
        <Stack {...styles.$customSongHitStackStyles}>
          <Text {...styles.$customSongHitTitleTextStyles}>{constants.SONG_HIT_TITLE}</Text>
          {hits?.map((hit: SongHitProps) => {
            if (hit?.cover && hit?.track_name)
              return (
                <Flex
                  {...styles.$customSongHitFlexStyles}
                  onClick={() => {
                    const spotlightId = `${hit.audio?.split('/ipfs/')[1]}`;
                    dispatch.spotlightModel.setSpotlightId(spotlightId);
                    dispatch.spotlightModel.getSpotlightSong(spotlightId);
                    dispatch.spotlightModel.setCurrentStep(SpotlightSteps.CONFIRM);
                  }}
                  key={hit.track_name + hit.cover}
                >
                  <CustomHitImage name={hit.track_name} styles={styles.$customSongHitAvatarStyles} src={hit.cover} title={hit.track_name} />
                  <Text {...styles.$customSongHitTextStyles}>
                    <span className="highlight">
                      <Highlight attribute="track_name" hit={hit} />
                    </span>
                  </Text>
                </Flex>
              );
          })}
        </Stack>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export const SongHit = connectHits(CustomSongHit);
