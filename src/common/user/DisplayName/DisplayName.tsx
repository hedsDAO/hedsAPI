import { User } from '@/models/common';
import { formatWallet } from '@/utils';
import { Box, Heading, Skeleton } from '@chakra-ui/react';

const DisplayName = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Box pt={2}>
      {userData?.wallet && (
        <Skeleton rounded="md" height="1.5rem" fadeDuration={2} isLoaded={!loading}>
          <Heading size={'lg'} data-testid="user-display-name">
            {userData?.displayName || formatWallet(userData?.wallet)}
          </Heading>
        </Skeleton>
      )}
    </Box>
  );
};

export default DisplayName;
