import { UserEvent } from '@/models/common';
import { store } from '@/store';
import { Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const RecentEvents = () => {
  const events = useSelector(store.select.userModel.selectUserEvents);
  return (
    <Stack>
      <Text fontSize="lg" letterSpacing={'widest'} fontFamily={'poppins'} fontWeight="bold" color="white">
        RECENT
      </Text>
      {events?.map((event: UserEvent) => {
        return (
          <>{event.event_data.message}</>
        )
      })}
    </Stack>
  );
};
