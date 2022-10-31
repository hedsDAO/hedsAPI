import { RootState } from '@/store';
import { Badge, Skeleton, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUserBadges } from '@/pages/user/store/selectors';

const Badges = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userBadges = useSelector(selectUserBadges);
  return (
    <Skeleton rounded="md" height="10px" fadeDuration={2} isLoaded={!loading}>
      <Stack direction="row">
        {userBadges &&
          Object.entries(userBadges).map(([id, badge]) => (
            <Badge variant="subtle" colorScheme="purple" key={id}>
              {badge.name}
            </Badge>
          ))}
      </Stack>
    </Skeleton>
  );
};

export default Badges;
