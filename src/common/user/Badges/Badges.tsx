import { RootState } from '@/store';
import { Badge, Skeleton, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUserBadges } from '@/pages/user/store/selectors';

const colorMapping = (name: string) => {
  if (name === 'Visitor') return 'gray';
  if (name === 'Artist') return 'purple';
  if (name === 'OG') return 'red';
};

const Badges = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userBadges = useSelector(selectUserBadges);
  return (
    <Skeleton rounded="md" height="10px" fadeDuration={2} isLoaded={!loading}>
      <Stack data-testid="user-badge-container" direction="row">
        {userBadges &&
          Object.entries(userBadges).map(([id, badge]) => (
            <Badge data-testid="user-badge" variant="outline" colorScheme={colorMapping(badge.name)} key={id}>
              {badge.name}
            </Badge>
          ))}
      </Stack>
    </Skeleton>
  );
};

export default Badges;
