import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { TrackItem } from '@/common/media/TrackItem';
import { Pagination } from '@/components/Pagination/Pagination';
import { store } from '@/store';
import { AspectRatio, Box, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import * as styles from '@pages/user/components/Discography/styles';

/**
 * @function Discography
 * @description Renders a users' discography of their tracks.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Discography = () => {
  const publicSongs = useSelector(store.select.userModel.selectSongs);
  const allSongs = useSelector(store.select.userModel.selectAllSongs);
  const numOfSongs = useSelector(store.select.userModel.selectNumOfSongs);
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const wallet = useSelector(store.select.userModel.selectWallet);
  const connected = useAccount();
  const isOwnWallet = wallet === connected.address;
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  const handleLikeEmptyStates = () => {
    if (isOwnWallet) {
      const itemsOnCurrentPage = allSongs?.slice(start, end)?.length;
      return allSongs?.length < 4 ? 4 - allSongs?.length : itemsOnCurrentPage < 4 ? 4 - itemsOnCurrentPage : 0;
    } else {
      const itemsOnCurrentPage = publicSongs?.slice(start, end)?.length;
      return publicSongs?.length < 4 ? 4 - publicSongs?.length : itemsOnCurrentPage < 4 ? 4 - itemsOnCurrentPage : 0;
    }
  };
  return (
    <GridItem {...styles.$mainContainerStyles}>
      <SimpleGrid {...styles.$discographyGridStyles}>
        {allSongs?.length
          ? isOwnWallet
            ? allSongs?.slice(start, end).map((item) => (
                <GridItem key={item.id + item.cover}>
                  <TrackItem link={item.audio.split('/ipfs/')[1]} name={item.submission_data.sub_id} image={item.cover} />
                </GridItem>
              ))
            : publicSongs?.slice(start, end).map((item) => (
                <GridItem key={item.id + item.cover}>
                  <TrackItem link={item.audio.split('/ipfs/')[1]} name={item.track_name} image={item.cover} />
                </GridItem>
              ))
          : [0, 1, 2, 3].map((_, index: number) => (
              <GridItem {...styles.$gridItemStyles} key={index}>
                <Box {...styles.$emptyCollectionBoxStyles}>
                  <AspectRatio ratio={1}>
                    <Box {...styles.$emptyBoxStyles} />
                  </AspectRatio>
                  <Text {...styles.$emptyTextStyles} />
                </Box>
              </GridItem>
            ))}
        {isOwnWallet && allSongs?.length > 0 ? (
          Array.from(Array(handleLikeEmptyStates()).keys()).map((i: number) => (
            <GridItem {...styles.$gridItemStyles} key={i + 'discog-empty'}>
              <Box {...styles.$emptyCollectionBoxStyles}>
                <AspectRatio ratio={1}>
                  <Box {...styles.$emptyBoxStyles} />
                </AspectRatio>
                <Text {...styles.$emptyTextStyles} />
              </Box>
            </GridItem>
          ))
        ) : publicSongs?.length > 0 ? (
          Array.from(Array(handleLikeEmptyStates()).keys()).map((i: number) => (
            <GridItem {...styles.$gridItemStyles} key={i + 'discog-empty'}>
              <Box {...styles.$emptyCollectionBoxStyles}>
                <AspectRatio ratio={1}>
                  <Box {...styles.$emptyBoxStyles} />
                </AspectRatio>
                <Text {...styles.$emptyTextStyles} />
              </Box>
            </GridItem>
          ))
        ) : (
          <></>
        )}
      </SimpleGrid>
      {numOfSongs > 4 && (
        <GridItem {...styles.$paginationContainerStyles}>
          <Pagination totalItems={numOfSongs} />
        </GridItem>
      )}
    </GridItem>
  );
};
