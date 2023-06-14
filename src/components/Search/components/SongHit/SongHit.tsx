import { Avatar, Flex, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { connectHits, Highlight } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { SongHitProps } from '@components/Search/models/common';
import * as styles from '@components/Search/components/SongHit/styles';

/**
 * @function CustomSongHit
 * @description A custom component to display a hit for a song from search results. On click, it navigates to the song's detail page.
 * @param {SongHitProps[]} hits - An array of search results for songs.
 * @returns {JSX.Element} - A component rendering a list of song hits or an empty fragment.
 */

const CustomSongHit = ({ hits }: { hits: SongHitProps[] }) => {
  const songHits = useSelector(store.select.searchModel.selectSongHits);
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(hits) !== JSON.stringify(songHits)) dispatch.searchModel.setSongHits(hits);
  }, [hits, songHits, dispatch]);

  return (
    <Fragment>
      {hits?.length ? (
        <Stack {...styles.$customSongHitStackStyles}>
          <Text {...styles.$customSongHitTitleTextStyles}>Songs</Text>
          {hits?.map((hit: SongHitProps) => {
            if (hit?.cover && hit?.track_name)
              return (
                <Flex
                  {...styles.$customSongHitFlexStyles}
                  onClick={() => {
                    if (window) window?.scrollTo(0, 0);
                    navigate(`/song/${hit.audio?.split('/ipfs/')[1]}`);
                    dispatch.searchModel.setIsSearchOpen(false);
                  }}
                  key={hit.track_name + hit.cover}
                >
                  <Avatar name={hit.track_name} {...styles.$customSongHitAvatarStyles} src={hit.cover} title={hit.track_name} />
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
