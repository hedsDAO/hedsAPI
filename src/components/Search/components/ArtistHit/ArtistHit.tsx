import { Fragment, useEffect } from 'react';
import { connectHits, Highlight } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { CustomHitImage } from '@components/Search/components/CustomHitImage/CustomHitImage';
import { ArtistHitProps } from '@components/Search/models/common';
import * as styles from '@components/Search/components/ArtistHit/styles';
import * as constants from '@components/Search/models/constants';


/**
 * @function CustomArtistHit
 * @description A custom component to display a hit for an artist from search results. On click, it navigates to the artist's detail page.
 * @param {ArtistHitProps[]} hits - An array of search results for artists.
 * @returns {JSX.Element} - A component rendering a list of artist hits or an empty fragment.
 */

const CustomArtistHit = ({ hits }: { hits: ArtistHitProps[] }) => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const artistHits = useSelector(store.select.searchModel.selectArtistHits);

  useEffect(() => {
    if (JSON.stringify(hits) !== JSON.stringify(artistHits)) dispatch.searchModel.setArtistHits(hits);
  }, [hits, artistHits, dispatch]);

  return (
    <Fragment>
      {hits?.length ? (
        <Stack {...styles.$customArtistHitStackStyles}>
          <Text {...styles.$customArtistHitTitleTextStyles}>{constants.ARTIST_HIT_TITLE}</Text>
          {hits?.map((hit: ArtistHitProps) => {
            if (hit?.display_name && hit?.profile_picture)
              return (
                <Flex
                  {...styles.$customArtistHitFlexStyles}
                  onClick={() => {
                    if (window) window?.scrollTo(0, 0);
                    navigate(`/u/${hit.wallet}`);
                    dispatch.searchModel.setIsSearchOpen(false);
                  }}
                  key={hit.display_name + hit.profile_picture}
                >
                  <CustomHitImage name={hit.display_name} src={hit.profile_picture} title={hit.display_name} styles={styles.$customArtistHitAvatarStyles} />
                  <Text {...styles.$customArtistHitTextStyles}>
                    <span className="highlight">
                      <Highlight attribute="display_name" hit={hit} />
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

export const ArtistHit = connectHits(CustomArtistHit);
