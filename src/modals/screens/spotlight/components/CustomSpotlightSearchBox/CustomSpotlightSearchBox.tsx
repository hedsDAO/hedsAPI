import { Dispatch, store } from '@/store';
import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Flex, Spinner, Input, IconButton } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from '@components/Search/components/CustomSearchBar/styles';
import * as constants from '@components/Search/models/constants';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }: any) => {
  const dispatch = useDispatch<Dispatch>();
  const isSearchOpen = useSelector(store.select.spotlightModel.selectSearchIsSearchOpen);
  const query = useSelector(store.select.spotlightModel.selectSearchQuery);

  useEffect(() => {
    if (!isSearchOpen && query.length > 0) dispatch.spotlightModel.clearSearchState();
  }, [isSearchOpen]);

  return (
    <Fragment>
      <Flex {...styles.$flexStyles} mb={4} as="form" action="" role="search" noValidate={true}>
        {isSearchStalled ? <Spinner {...styles.$spinnerStyles} /> : <SearchIcon {...styles.$searchIconStyles} />}
        <Input
          placeholder={constants.SEARCH_PLACHOLDER}
          {...styles.$inputStyles}
          onFocus={() => dispatch.spotlightModel.setSearchIsSearchOpen(true)}
          value={currentRefinement}
          onChange={(event) => {
            dispatch.spotlightModel.setSearchQuery(event.currentTarget.value);
            refine(event.currentTarget.value);
          }}
        />
        {currentRefinement?.length > 1 && <IconButton {...styles.$iconButtonStyles} onClick={() => refine('')} icon={<SmallCloseIcon />} />}
      </Flex>
    </Fragment>
  );
};
export const CustomSpotlightSearchBox = connectSearchBox(SearchBox);
