import { useSelector } from 'react-redux';

// Components
import { Button, HStack, Stack, Text } from '@chakra-ui/react';

// Utils
import { DateTime } from 'luxon';
import { getTimePassed } from '@/utils';
import { store } from '@/store';

// Styles
import * as styles from '@/pages/tape/components/TimelineButtons/styles';

export const TimelineButtons = () => {
  const timeline = useSelector(store.select.tapeModel.selectTimeline);
  const cycle = useSelector(store.select.tapeModel.selectCurrentCycle);

  const formatTime = (time: number) => {
    if (time !== 0) {
      const dateObj = DateTime.fromMillis(time);
      const date = dateObj.toLocaleString({
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      });
      return date;
    }
  };

  return (
    <Stack {...styles.$timelineButtonsStackStyles}>
      <HStack>
        <Text {...styles.$cycleNameTextStyles}>Submit</Text>
        {cycle === 'submit' ? (
          <i className="fa-solid fa-lock-keyhole-open" style={{ color: '#05FF00' }} />
        ) : (
          <i className="fa-solid fa-lock-keyhole" style={{ color: '#F02A2A' }} />
        )}
        <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.submit?.start)}</Text>
      </HStack>
      <Button {...styles.$buttonStyles} leftIcon={<i className="fa-solid fa-arrow-down-to-line" />} isDisabled={!(cycle === 'submit')}>
        UPLOAD SUBMISSION
      </Button>
      <HStack>
        <Text color="#9293FF" fontFamily="sans-serif">
          Vote
        </Text>
        {cycle === 'vote' ? (
          <i className="fa-solid fa-lock-keyhole-open" style={{ color: '#05FF00' }} />
        ) : (
          <i className="fa-solid fa-lock-keyhole" style={{ color: '#F02A2A' }} />
        )}
        <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.vote?.start)}</Text>
      </HStack>
      <Button {...styles.$buttonStyles} leftIcon={<i className="fa-sharp fa-solid fa-circle-check"></i>} isDisabled={!(cycle === 'vote')}>
        VOTE NOW
      </Button>
      <HStack>
        <Text color="#9293FF" fontFamily="sans-serif">
          Mint
        </Text>
        <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.mint?.start)}</Text>
      </HStack>
      <Button {...styles.$buttonStyles} leftIcon={<i className="fa-solid fa-bell" />}>
        {cycle === 'mint' ? 'MINT' : 'GET NOTIFIED'}
      </Button>
    </Stack>
  );
};
