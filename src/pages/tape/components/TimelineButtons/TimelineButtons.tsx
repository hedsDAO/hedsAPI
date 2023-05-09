import { useSelector } from 'react-redux';

// Components
import { Button, HStack, Stack, Text } from '@chakra-ui/react';

// Utils
import { DateTime } from 'luxon';
import { getTimePassed } from '@/utils';
import { store } from '@/store';

export const TimelineButtons = () => {
  const timeline = useSelector(store.select.tapeModel.selectTimeline);
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
    <Stack justifyContent={['flex-start', 'center']} alignItems="flex-start">
      <HStack>
        <Text color="#9293FF" fontFamily="sans-serif">
          Submit
        </Text>
        <i className="fa-solid fa-lock-keyhole" style={{ color: '#F02A2A' }} />
        <Text color="white" fontFamily="sans-serif" fontSize="xs">
          {formatTime(timeline?.submit?.start)}
        </Text>
      </HStack>
      <Button
        bgColor="#745CBA"
        color="white"
        fontFamily="sans-serif"
        fontWeight="light"
        leftIcon={<i className="fa-solid fa-arrow-down-to-line" />}
        fontSize="xs"
      >
        UPLOAD SUBMISSION
      </Button>
      <HStack>
        <Text color="#9293FF" fontFamily="sans-serif">
          Vote
        </Text>
        <i className="fa-solid fa-lock-keyhole-open" style={{ color: '#05FF00' }} />
        <Text color="white" fontFamily="sans-serif" fontSize="xs">
          {formatTime(timeline?.vote?.start)}
        </Text>
      </HStack>
      <Button
        bgColor="#745CBA"
        color="white"
        fontFamily="sans-serif"
        fontWeight="light"
        fontSize="xs"
        leftIcon={<i className="fa-sharp fa-solid fa-circle-check"></i>}
      >
        VOTE NOW
      </Button>
      <HStack>
        <Text color="#9293FF" fontFamily="sans-serif">
          Mint
        </Text>
        <Text color="white" fontFamily="sans-serif" fontSize="xs">
          {formatTime(timeline?.mint?.start)}
        </Text>
      </HStack>
      <Button bgColor="#745CBA" color="white" fontFamily="sans-serif" fontWeight="light" leftIcon={<i className="fa-solid fa-bell" />} fontSize="xs">
        GET NOTIFIED
      </Button>
    </Stack>
  );
};
