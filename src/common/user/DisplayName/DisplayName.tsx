import { User } from '@/models/common';
import { formatWallet } from '@/utils';
import { Heading, Skeleton } from '@chakra-ui/react';
import { Fragment } from 'react';

const DisplayName = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Fragment>
      {userData?.wallet && (
        <Skeleton rounded="md" h='full' fadeDuration={2} isLoaded={!loading}>
          <Heading size={'lg'} data-testid="user-display-name">
            {userData?.displayName || formatWallet(userData?.wallet)}
          </Heading>
        </Skeleton>
      )}
    </Fragment>
  );
};

export default DisplayName;
