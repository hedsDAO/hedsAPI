import { Dispatch, store } from '@/store';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarTabs } from '../models/common';

const TapeNavbar = () => {
  const dispatch = useDispatch<Dispatch>();
  const selectedTab = useSelector(store.select.tapesModel.selectCurrentTab);

  return (
    <Flex bg="blackAlpha.200" p={6}>
      <Box>
        <Button
          px={6}
          size="sm"
          fontWeight="medium"
          rounded="full"
          border={'1px solid black'}
          bg={selectedTab === NavbarTabs.TRACKS ? 'black' : 'white'}
          onClick={() => dispatch.tapesModel.setCurrentTab(0)}
          mr={4}
          color={selectedTab === NavbarTabs.TRACKS ? 'white' : 'black'}
        >
          TRACKS
        </Button>
        <Button
          px={6}
          border={'1px solid black'}
          size="sm"
          fontWeight="medium"
          rounded="full"
          bg={selectedTab === NavbarTabs.DETAILS ? 'black' : 'white'}
          onClick={() => dispatch.tapesModel.setCurrentTab(1)}
          mr={4}
          color={selectedTab === NavbarTabs.DETAILS ? 'white' : 'black'}
        >
          DETAILS
        </Button>
      </Box>
    </Flex>
  );
};

export default TapeNavbar;
