import { store } from '@/store';
import { Badge, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const colorMapping = (name: string) => {
  if (name === 'Visitor') return 'gray';
  if (name === 'Artist') return 'purple';
  if (name === 'OG') return 'red';
};

const Badges = () => {
  const badges = useSelector(store.select.userModel.selectCurrentUserBadges);
  return (
    <Stack data-testid="user-badge-container" direction={'row'}>
      {badges?.length &&
        Object.entries(badges).map(([id, badge]) => (
          <Badge letterSpacing={'wider'} fontFamily={'heading'} data-testid="user-badge" variant="outline" colorScheme={colorMapping(badge?.name)} key={id}>
            {badge?.name}
          </Badge>
        ))}
    </Stack>
  );
};

export default Badges;
