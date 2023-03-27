import { useParams } from 'react-router-dom';
import { mockTape, mockUser } from './models/constant';
import { TapeDetails, TapeHeader, TapeNavbar, TapeTracks } from './components';
import { Tape as TapeMetadata, User } from '@/models/common';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { NavbarTabs } from './models/common';

export const Tape = () => {
  // TODO: id to query SQL DB
  // const { id } = useParams();
  const tape = mockTape as TapeMetadata;
  const user = mockUser as User;
  const currentTab = useSelector(store.select.tapesModel.selectCurrentTab);

  return (
    <Box>
      <TapeHeader tape={tape} curator={user} />
      <TapeNavbar />
      {currentTab === NavbarTabs.TRACKS && <TapeTracks />}
      {currentTab === NavbarTabs.DETAILS && <TapeDetails tape={tape} curator={user} />}
    </Box>
  );
};
