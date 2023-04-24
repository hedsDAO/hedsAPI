import { useSelector } from 'react-redux';
import { UserEvent } from '@/common/events/UserEvent';
import { UserEvents } from '@/models/common';
import { store } from '@/store';
import { Stack } from '@chakra-ui/react';
import * as styles from '@pages/user/components/RecentEvents/styles';

/**
 * @function RecentEvents
 * @description Renders a users' recent interactions and events on the site.
 * @returns {JSX.Element} - Rendered component.
 **/

export const RecentEvents = () => {
  const events = useSelector(store.select.userModel.selectUserEvents);
  const name = useSelector(store.select.userModel.selectDisplayName);
  return (
    <Stack>
      <Stack {...styles.$stackStyles}>
        {events?.length &&
          events?.map((event: UserEvents) => {
            return <UserEvent key={event.event_timestamp} name={name} event={event} />;
          })}
      </Stack>
    </Stack>
  );
};
