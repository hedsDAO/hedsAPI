import { Dispatch, store } from '@/store';
import { Flex, Button, Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const Pagination = ({ totalItems }: { totalItems: number }) => {
  const dispatch = useDispatch<Dispatch>();
  const currentPage = useSelector(store.select.paginationModel.selectCurrentPage);
  const itemsPerPage = useSelector(store.select.paginationModel.selectItemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) {
      dispatch.paginationModel.setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      dispatch.paginationModel.setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch.paginationModel.setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(
        <Text
          key={`page-${i}`}
          onClick={() => handlePageClick(i)}
          _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
          fontWeight={currentPage === i ? 'bold' : 'normal'}
          fontStyle={'karla'}
          fontSize="sm"
          color="white"
          opacity={currentPage === i ? '100%' : '50%'}
          mx={1}
        >
          {i + 1}
        </Text>,
      );
    }
    return pageNumbers;
  };
  useEffect(() => {
    dispatch.paginationModel.setCurrentPage(0);
    dispatch.paginationModel.setItemsPerPage(4);
  }, []);

  return (
    <Box data-testid="pagination" w="full">
      <Flex justifyContent={'space-between'} minW="full" alignItems={'center'}>
        <Button
          size="sm"
          border="solid 1px"
          borderColor="heds.400"
          color="white"
          px={'2 !important'}
          rounded="md"
          fontSize="xs"
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          opacity={currentPage === 0 ? '50%' : '100%'}
          onClick={handlePrevious}
          isDisabled={currentPage === 0}
          marginRight={2}
        >
          Prev
        </Button>
        <Flex gap={2} alignItems={'center'}>
          {renderPageNumbers()}
        </Flex>
        <Button
          size="sm"
          border="solid 1px"
          borderColor="heds.400"
          color="white"
          px={'2 !important'}
          rounded="md"
          fontSize="xs"
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          opacity={currentPage === totalPages - 1 ? '50%' : '100%'}
          onClick={handleNext}
          isDisabled={currentPage === totalPages - 1}
          marginLeft={2}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};
