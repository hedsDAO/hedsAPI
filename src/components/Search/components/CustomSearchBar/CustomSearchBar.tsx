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
  const isSearchOpen = useSelector(store.select.searchModel.selectIsSearchOpen);
  const query = useSelector(store.select.searchModel.selectQuery);

  useEffect(() => {
    if (!isSearchOpen && query.length > 0) dispatch.searchModel.clearSearchState();
  }, [isSearchOpen]);

  return (
    <Fragment>
      <Flex {...styles.$flexStyles} as="form" action="" role="search" noValidate={true}>
        {isSearchStalled ? <Spinner {...styles.$spinnerStyles} /> : <SearchIcon {...styles.$searchIconStyles} />}
        <Input
          placeholder={constants.SEARCH_PLACHOLDER}
          {...styles.$inputStyles}
          onFocus={() => dispatch.searchModel.setIsSearchOpen(true)}
          value={currentRefinement}
          onChange={(event) => {
            dispatch.searchModel.setQuery(event.currentTarget.value);
            refine(event.currentTarget.value);
          }}
        />
        {currentRefinement?.length > 1 && <IconButton {...styles.$iconButtonStyles} onClick={() => refine('')} icon={<SmallCloseIcon />} />}
      </Flex>
    </Fragment>
  );
};
export const CustomSearchBox = connectSearchBox(SearchBox);
