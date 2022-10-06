import { User } from '@/models/common';
import { Box, Heading, Skeleton } from '@chakra-ui/react';

const DisplayName = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Box>
      <Skeleton rounded="md" height="1.5rem" fadeDuration={2} isLoaded={!loading}>
        <Heading my={2} py={2} size={'lg'} data-testid="user-display-name">
          {userData?.displayName}
        </Heading>
      </Skeleton>
    </Box>
  );
};

export default DisplayName;
