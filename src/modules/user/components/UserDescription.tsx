import React from 'react';
import { User } from '@/models/common';
import { Box, SkeletonText, Text } from '@chakra-ui/react';

const UserDescription = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Box py="2">
      <SkeletonText rounded="md" height="20px" noOfLines={2} fadeDuration={2} isLoaded={!loading}>
        <Text data-testid="user-description" fontSize={'sm'}>
          {userData?.description}
        </Text>
      </SkeletonText>
    </Box>
  );
};

export default UserDescription;
