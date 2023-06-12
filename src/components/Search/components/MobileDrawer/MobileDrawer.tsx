import { Configure, Index } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { ArtistHit } from '@components/Search/components/ArtistHit/ArtistHit';
import { CustomSearchBox } from '@components/Search/components/CustomSearchBar/CustomSearchBar';
import { SongHit } from '@components/Search/components/SongHit/SongHit';
import { TapeHit } from '@components/Search/components/TapeHit/TapeHit';
import * as styles from '@components/Search/components/MobileDrawer/styles';

/**
 * @function MobileDrawer
 * @description The MobileDrawer component renders a modal that displays search results.
 * @returns {JSX.Element} - A modal that displays search results.
 */

export const MobileDrawer = () => {
  const dispatch = useDispatch<Dispatch>();
  const isSearchOpen = useSelector(store.select.searchModel.selectIsSearchOpen);
  const query = useSelector(store.select.searchModel.selectQuery);
  const isSearchEmpty = useSelector(store.select.searchModel.selectAreAllHitsEmpty);

  return (
    <Drawer isOpen={isSearchOpen} onClose={() => dispatch.searchModel.setIsSearchOpen(false)} {...styles.$drawerStyles}>
      <DrawerOverlay {...styles.$drawerOverlayStyles} />
      <DrawerContent>
        <DrawerBody as={Stack} {...styles.$drawerBodyStyles} gap={4}>
          <Flex {...styles.$flexStyles}>
            <IconButton onClick={() => dispatch.searchModel.setIsSearchOpen(false)} icon={<ArrowBackIcon boxSize={3} />} {...styles.$iconButtonStyles} />
            <CustomSearchBox />
          </Flex>
          {isSearchEmpty && query?.length > 1 ? (
            <Stack {...styles.$stackStyles}>
              <Text {...styles.$textStyles}>No results found for your search "{query}"</Text>
            </Stack>
          ) : (
            <Stack>
              <Index indexName="artists">
                <Configure hitsPerPage={5} />
                <ArtistHit />
              </Index>
              <Index indexName="tapes">
                <Configure hitsPerPage={5} />
                <TapeHit />
              </Index>
              <Index indexName="songs">
                <Configure hitsPerPage={5} />
                <SongHit />
              </Index>
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
