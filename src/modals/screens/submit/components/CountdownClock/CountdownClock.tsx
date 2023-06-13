import React, { useEffect, useState } from 'react';
import { Box, Text, Stack, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';

interface CountdownProps {
  milliseconds: number;
}

export const CountdownClock: React.FC<CountdownProps> = ({ milliseconds }) => {
  const [timeLeft, setTimeLeft] = useState(milliseconds);

  const formatTime = (time: number) => {
    let timeStr = Math.floor(time).toString();
    if (timeStr.length < 2) {
      return '0' + timeStr;
    }
    return timeStr;
  };

  useEffect(() => {
    if (timeLeft === milliseconds) setTimeLeft(milliseconds - DateTime.local().toMillis());
    const interval = setInterval(() => {
      let diff = milliseconds - DateTime.local().toMillis();
      setTimeLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = formatTime(timeLeft / (1000 * 60 * 60 * 24));
  const hours = formatTime((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = formatTime((timeLeft / (1000 * 60)) % 60);
  const seconds = formatTime((timeLeft / 1000) % 60);

  return (
    <VStack>
      <Text color="white" opacity={'50%'} fontSize="sm" fontFamily={'inter'} letterSpacing="wider">
        SUBMISSIONS CLOSE IN
      </Text>
      <Stack direction="row" spacing={3}>
        <Stack alignItems="center" width="4ch">
          <Text fontSize="2xl" fontFamily={'space'} color="heds.200">
            {days}
          </Text>
          <Text fontSize="md" color="white" opacity={'70%'}>
            DAYS
          </Text>
        </Stack>
        <Text fontSize="lg" color="heds.200">
          :
        </Text>
        <Stack alignItems="center" width="4ch">
          <Text fontSize="2xl" fontFamily={'space'} color="heds.200">
            {hours}
          </Text>
          <Text fontSize="md" color="white" opacity={'70%'}>
            HRS
          </Text>
        </Stack>
        <Text fontSize="lg" color="heds.200">
          :
        </Text>
        <Stack alignItems="center" width="4ch">
          <Text fontSize="2xl" fontFamily={'space'} color="heds.200">
            {minutes}
          </Text>
          <Text fontSize="md" color="white" opacity={'70%'}>
            MIN
          </Text>
        </Stack>
        <Text fontSize="lg" color="heds.200">
          :
        </Text>
        <Stack alignItems="center" width="4ch">
          <Text fontSize="2xl" fontFamily={'space'} color="heds.200">
            {seconds}
          </Text>
          <Text fontSize="md" color="white" opacity={'80%'}>
            SEC
          </Text>
        </Stack>
      </Stack>
    </VStack>
  );
};

export default CountdownClock;
