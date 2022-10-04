import { User } from '@/models/common';
import { Badge, Skeleton, Stack } from '@chakra-ui/react';

const UserBadge = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Skeleton rounded="md" height="10px" fadeDuration={2} isLoaded={!loading}>
      <Stack direction="row">
        {userData.badges &&
          Object.entries(userData.badges).map(([id, badge]) => (
            <Badge variant="subtle" colorScheme="purple" key={id}>
              {badge.name}
            </Badge>
          ))}
      </Stack>
    </Skeleton>
  );
};

export default UserBadge;
