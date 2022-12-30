import { Grid, GridItem } from '@chakra-ui/react';
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
        <Fragment>
          <Banner />
          <Grid
            gap={5}
            px={{ base: '5', lg: '8' }}
            justifyContent="center"
            alignItems={{ base: 'center', lg: 'unset' }}
            maxW="7xl"
            mx="auto"
            w="full"
            templateColumns={'repeat(12, 1fr)'}
          >
            <GridItem colSpan={{ base: 12, lg: 3 }}>
              <UserCard />
            </GridItem>
            <GridItem colSpan={{ base: 12, lg: 9 }}>
              <UserTabs />
            </GridItem>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};
