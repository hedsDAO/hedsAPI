import algoliasearch from 'algoliasearch/lite';
import * as constants from '@components/Search/models/constants';
import { InstantSearch } from 'react-instantsearch-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { CustomSpotlightSearchBox } from '../CustomSpotlightSearchBox/CustomSpotlightSearchBox';
import { Stack } from '@chakra-ui/react';
import { SpotlightSongHit } from '../SpotlightSongHit/SpotlightSongHit';

const searchClient = algoliasearch(constants.ALGOLIA_APP_ID, constants.ALGOLIA_SEARCH_API_KEY);

export const SearchScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const spotlightSearchState = useSelector(store.select.spotlightModel.selectSpotlightSearchState);
  return (
    <Stack justifyContent={'space-between'} pb={3}>
      <InstantSearch
        searchClient={searchClient}
        indexName={'songs'}
        searchState={spotlightSearchState}
        onSearchStateChange={(newSearchState) => dispatch.spotlightModel.setSpotlightSearchState(newSearchState)}
      >
        <CustomSpotlightSearchBox />
        <SpotlightSongHit />
      </InstantSearch>
    </Stack>
  );
};
