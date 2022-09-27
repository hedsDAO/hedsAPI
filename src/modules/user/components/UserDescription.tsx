import React, { Fragment } from 'react';
import { User } from '@/models/common';
import { Box, Skeleton, Text } from '@chakra-ui/react';

const UserDescription = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Fragment>
      <Box py="2">
        <Skeleton rounded="md" height="10px" fadeDuration={2} isLoaded={!loading}>
          <Text data-testid="user-description" fontSize={'sm'}>
            {userData?.description || '...'}
          </Text>
        </Skeleton>
        <Skeleton rounded="md" mt="1" height="10px" fadeDuration={2} isLoaded={!loading} />
      </Box>
    </Fragment>
  );
};

export default UserDescription;
