import { User } from '@/models/common';
import { Box, Heading, Skeleton } from '@chakra-ui/react';

const DisplayName = ({ loading, profileData }: { loading: boolean; profileData: User }) => {
  return (
    <Box>
      <Skeleton rounded="md" height="1.5rem" fadeDuration={2} isLoaded={!loading}>
        <Heading size={'lg'} data-testid="user-display-name">
          {profileData?.displayName}
        </Heading>
      </Skeleton>
    </Box>
  );
};

export default DisplayName;
