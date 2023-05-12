import { useState, useEffect } from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';

interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface OwnProps {
  epochTime: number;
}

export const Countdown = ({ epochTime }: OwnProps) => {
  const [time, setTime] = useState<Time>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const countDownDate = new Date(epochTime).getTime();
      const now = new Date().getTime();

      const distance = countDownDate - now;

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [epochTime]);

  return (
    <HStack spacing={4}>
      <Box>
        <Text fontSize="xl">{time.days}</Text>
        <Text>Days</Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text fontSize="xl">{time.hours}</Text>
        <Text>Hours</Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text fontSize="xl">{time.minutes}</Text>
        <Text>Minutes</Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text fontSize="xl">{time.seconds}</Text>
        <Text>Seconds</Text>
      </Box>
    </HStack>
  );
};
