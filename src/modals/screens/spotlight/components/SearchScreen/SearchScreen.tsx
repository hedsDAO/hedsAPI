import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Stack } from '@chakra-ui/react';
import { CustomSpotlightSearchBox } from '@/modals/screens/spotlight/components/CustomSpotlightSearchBox/CustomSpotlightSearchBox';
import { SpotlightSongHit } from '@/modals/screens/spotlight/components/SpotlightSongHit/SpotlightSongHit';
import * as styles from '@/modals/screens/spotlight/components/SearchScreen/styles';
import * as constants from '@/modals/screens/spotlight/models/constants';

const searchClient = algoliasearch(constants.ALGOLIA_APP_ID, constants.ALGOLIA_SEARCH_API_KEY);

/**
 * @function SearchScreen
 * @returns {JSX.Element} The `SearchScreen` component JSX element.
 * @description Displays the search screen input and results for the spotlight modal.
 */

export const SearchScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const spotlightSearchState = useSelector(store.select.spotlightModel.selectSpotlightSearchState);
  return (
    <Stack {...styles.$stackStyles}>
      <InstantSearch
        searchClient={searchClient}
        indexName={constants.SEARCH_INDEX}
        searchState={spotlightSearchState}
        onSearchStateChange={(newSearchState) => dispatch.spotlightModel.setSpotlightSearchState(newSearchState)}
      >
        <CustomSpotlightSearchBox />
        <SpotlightSongHit />
      </InstantSearch>
    </Stack>
  );
};
