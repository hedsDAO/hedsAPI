import { UserEvent } from '@/common/events/UserEvent';
import { UserEvents } from '@/models/common';
import { store } from '@/store';
import { Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const RecentEvents = () => {
  const events = useSelector(store.select.userModel.selectUserEvents);
  const name = useSelector(store.select.userModel.selectDisplayName);
  return (
    <Stack>
      <Stack justifySelf={'start'}>
        {events?.length && events?.map((event: UserEvents) => {
          return <UserEvent key={event.event_timestamp} name={name} event={event} />;
        })}
      </Stack>
    </Stack>
  );
};
