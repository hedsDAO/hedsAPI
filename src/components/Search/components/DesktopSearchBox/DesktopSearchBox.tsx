import { Configure, Index } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { ArtistHit } from '@components/Search/components/ArtistHit/ArtistHit';
import { SongHit } from '@components/Search/components/SongHit/SongHit';
import { TapeHit } from '@components/Search/components/TapeHit/TapeHit';
import * as constants from '@components/Search/models/constants';
import * as styles from '@components/Search/components/DesktopSearchBox/styles';

/**
 * @function DesktopSearchBox
 * @description The DesktopSearchBox component renders a modal that displays search results.
 * @returns {JSX.Element} - A modal that displays search results.
 */

export const DesktopSearchBox = () => {
  const dispatch = useDispatch<Dispatch>();
  const isSearchOpen = useSelector(store.select.searchModel.selectIsSearchOpen);
  const isSearchEmpty = useSelector(store.select.searchModel.selectAreAllHitsEmpty);
  const query = useSelector(store.select.searchModel.selectQuery);

  return (
    <Modal
      isOpen={isSearchOpen}
      onClose={() => dispatch.searchModel.clearSearchState()}
      onOverlayClick={() => dispatch.searchModel.setIsSearchOpen(false)}
      {...styles.modalStyles}
    >
      <ModalOverlay {...styles.modalOverlayStyles} />
      <ModalContent aria-hidden {...styles.modalContentStyles}>
        {isSearchEmpty && query?.length > 1 ? (
          <ModalBody {...styles.modalBodyEmptyStyles} as={Stack}>
            <Text {...styles.textStyles}>{constants.handleEmptySearch(query)}</Text>
          </ModalBody>
        ) : (
          <ModalBody as={Stack}>
            <Index indexName={constants.TAPE_INDEX}>
              <Configure hitsPerPage={5} />
              <TapeHit />
            </Index>
            <Index indexName={constants.SONG_INDEX}>
              <Configure hitsPerPage={5} />
              <SongHit />
            </Index>
            <Index indexName={constants.ARTIST_INDEX}>
              <Configure hitsPerPage={5} />
              <ArtistHit />
            </Index>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
