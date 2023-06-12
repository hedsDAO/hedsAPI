import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useBreakpointValue } from '@chakra-ui/react';
import { CustomSearchBox } from '@components/Search/components/CustomSearchBar/CustomSearchBar';
import { DesktopSearchBox } from '@components/Search/components/DesktopSearchBox/DesktopSearchBox';
import { MobileDrawer } from '@components/Search/components/MobileDrawer/MobileDrawer';
import { MobileSearchButton } from '@components/Search/components/MobileSearchButton/MobileSearchButton';
import * as constants from '@components/Search/models/constants';

const searchClient = algoliasearch(constants.ALGOLIA_APP_ID, constants.ALGOLIA_SEARCH_API_KEY);

/**
 * @function Search
 * @description The Search component renders the components for search functionality on desktop and mobile
 * @returns {JSX.Element} - A search bar and search results.
 */

export const Search = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const dispatch = useDispatch<Dispatch>();
  const searchState = useSelector(store.select.searchModel.selectSearchState);
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={constants.SONG_INDEX}
      searchState={searchState}
      onSearchStateChange={(newSearchState) => dispatch.searchModel.setSearchState(newSearchState)}
    >
      {isMobile ? <MobileSearchButton /> : <CustomSearchBox />}
      {isMobile ? <MobileDrawer /> : <DesktopSearchBox />}
    </InstantSearch>
  );
};
