import { RootState, store } from '@/store';
import { Badge, Skeleton, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const colorMapping = (name: string) => {
  if (name === 'Visitor') return 'gray';
  if (name === 'Artist') return 'purple';
  if (name === 'OG') return 'red';
};

const Badges = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const badges = useSelector(store.select.userModel.selectCurrentUserBadges);
  return (
    <Skeleton px={1} rounded="md" mt={3} height="10px" fadeDuration={2} isLoaded={!loading}>
      <Stack data-testid="user-badge-container" direction="row">
        {!loading &&
          badges?.length &&
          Object.entries(badges).map(([id, badge]) => (
            <Badge data-testid="user-badge" variant="outline" colorScheme={colorMapping(badge?.name)} key={id}>
              {badge?.name}
            </Badge>
          ))}
      </Stack>
    </Skeleton>
  );
};

export default Badges;
