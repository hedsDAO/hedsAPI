import { mockTape, mockUser, tabs } from './models/constant';
import { TapeDetails, TapeHeader, TapeTracks } from './components';
import { Tape as TapeMetadata, User } from '@/models/common';
import { Box, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { NavbarTabs } from './models/common';
import { Nav } from '@/components/nav/Nav';

export const Tape = () => {
  const tape = mockTape as TapeMetadata;
  const user = mockUser as User;
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);

  return (
    <Box>
      <TapeHeader tape={tape} curator={user} />
      <Nav tabs={tabs} />
      <Divider/>
      {currentTab === NavbarTabs.TRACKS && <TapeTracks />}
      {currentTab === NavbarTabs.DETAILS && <TapeDetails tape={tape} curator={user} />}
    </Box>
  );
};
