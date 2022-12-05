import { Box, Flex } from '@chakra-ui/react';
import { UserCard, UserTabs, Banner } from '../components';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

export const User = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentUser = useSelector(store.select.userModel.selectCurrentUser);
  useEffect(() => {
    return () => {
      dispatch.userModel.clearCurrentUserState();
    };
  }, []);
  return (
    <Fragment>
      {currentUser && (
        <Box>
          <Banner />
          <Flex
            px={{ base: '5', lg: '2' }}
            alignItems={{ base: 'center', lg: 'normal' }}
            direction={{ base: 'column', lg: 'row' }}
            gap={{ lg: 10 }}
            mx={'auto'}
            maxW={'6xl'}
          >
            <UserCard />
            <UserTabs />
          </Flex>
        </Box>
      )}
    </Fragment>
  );
};
