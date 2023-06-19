import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import * as styles from '@components/Search/components/MobileSearchButton/styles';

/**
 * @function MobileSearchButton
 * @description A button for opening the search on a mobile device.
 * @returns {JSX.Element} - An IconButton that toggles the search state in the Redux store.
 */

export const MobileSearchButton = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Flex {...styles.$mobileSearchButtonFlexStyles}>
      <IconButton {...styles.$mobileSearchButtonIconButtonStyles} onClick={() => dispatch.searchModel.setIsSearchOpen(true)} icon={<SearchIcon />} />
    </Flex>
  );
};
