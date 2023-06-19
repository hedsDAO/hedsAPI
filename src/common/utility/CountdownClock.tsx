import React, { useEffect, useState } from 'react';
import { Text, Stack, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';

interface CountdownProps {
  milliseconds: number;
  header?: string;
}

interface TimeUnitProps {
  time: string;
  unit: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ time, unit }) => (
  <Stack alignItems="center" width="4ch">
    <Text fontSize="2xl" fontFamily={'space'} color="heds.200">
      {time}
    </Text>
    <Text fontSize="md" color="white" opacity={'70%'}>
      {unit}
    </Text>
  </Stack>
);

export const CountdownClock: React.FC<CountdownProps> = ({ milliseconds, header }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const formatTime = (time: number) => {
    return time.toFixed(0).padStart(2, '0');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = milliseconds - DateTime.local().toMillis();
      setTimeLeft({
        days: formatTime(diff / (1000 * 60 * 60 * 24)),
        hours: formatTime((diff / (1000 * 60 * 60)) % 24),
        minutes: formatTime((diff / (1000 * 60)) % 60),
        seconds: formatTime((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [milliseconds]);

  return (
    <VStack>
      {header?.length && (
        <Text color="white" opacity={'50%'} fontSize="sm" fontFamily={'inter'} letterSpacing="wider">
          {header}
        </Text>
      )}
      <Stack direction="row" spacing={3}>
        <TimeUnit time={timeLeft.days} unit="DAYS" />
        <Text fontSize="lg" color="heds.200">
          :
        </Text>
        <TimeUnit time={timeLeft.hours} unit="HRS" />
        <Text fontSize="lg" color="heds.200">
          :
        </Text>
        <TimeUnit time={timeLeft.minutes} unit="MIN" />
        <Text fontSize="lg" color="heds.200">
          :
        </Text>
        <TimeUnit time={timeLeft.seconds} unit="SEC" />
      </Stack>
    </VStack>
  );
};

export default CountdownClock;
