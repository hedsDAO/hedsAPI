import { Fragment, useEffect } from 'react';
import { connectHits, Highlight } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { Avatar, Flex, Stack, Text } from '@chakra-ui/react';
import { TapeHitProps } from '@components/Search/models/common';
import * as styles from '@components/Search/components/TapeHit/styles';

/**
 * @function CustomTapeHit
 * @description A custom component to display a hit for a tape from search results. On click, it navigates to the tape's detail page.
 * @param {TapeHitProps[]} hits - An array of search results for tapes.
 * @returns {JSX.Element} - A component rendering a list of tape hits or an empty fragment.
 */

const CustomTapeHit = ({ hits }: { hits: TapeHitProps[] }) => {
  const tapeHits = useSelector(store.select.searchModel.selectTapeHits);
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(hits) !== JSON.stringify(tapeHits)) dispatch.searchModel.setTapeHits(hits);
  }, [hits, tapeHits, dispatch]);

  return (
    <Fragment>
      {hits?.length ? (
        <Stack {...styles.$customTapeHitStackStyles}>
          <Text {...styles.$customTapeHitTitleTextStyles}>Tapes</Text>
          {hits?.map((hit: TapeHitProps) => {
            if (hit?.image && hit?.name)
              return (
                <Flex
                  {...styles.$customTapeHitFlexStyles}
                  onClick={() => {
                    if (window) window?.scrollTo(0, 0);
                    navigate(`/tape/${hit.objectID}`);
                    dispatch.searchModel.setIsSearchOpen(false);
                  }}
                  key={hit.name + hit.image}
                >
                  <Avatar name={hit.name} {...styles.$customTapeHitAvatarStyles} src={hit.image} title={hit.name} />
                  <Text {...styles.$customTapeHitTextStyles}>
                    <span className="highlight">
                      <Highlight attribute="name" hit={hit} />
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

export const TapeHit = connectHits(CustomTapeHit);
