import { Fragment } from 'react';
import { User } from '@/models/common';
import { Box, Skeleton, Text } from '@chakra-ui/react';

const UserDescription = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Fragment>
      <Skeleton rounded="md" height="fit-content" fadeDuration={2} isLoaded={!loading}>
        <Text className='-mt-2' data-testid="user-description" fontSize={'sm'} color={'gray.600'}>
          {userData?.description || '...'}
        </Text>
      </Skeleton>
    </Fragment>
  );
};

export default UserDescription;
