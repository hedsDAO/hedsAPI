import { useState, useEffect } from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';

interface Time {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface OwnProps {
  epochTime: number;
}

export const Countdown = ({ epochTime }: OwnProps) => {
  const [time, setTime] = useState<Time>({
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const countDownDate = new Date(epochTime).getTime();
      const now = new Date().getTime();

      const distance = countDownDate - now;

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
        seconds: Math.floor((distance % (1000 * 60)) / 1000).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [epochTime]);

  return (
    <HStack spacing={4} justifyContent="center">
      <Box>
        <Text fontSize="2xl" fontFamily="monospace" color="#AC8FFF" letterSpacing="wide">
          {time.days}
        </Text>
        <Text fontFamily="inter" fontWeight="400" color="#C6C6C6">
          DAYS
        </Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text fontSize="2xl" fontFamily="monospace" color="#AC8FFF" letterSpacing="wide">
          {time.hours}
        </Text>
        <Text fontFamily="inter" fontWeight="400" color="#C6C6C6">
          HRS
        </Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text fontSize="2xl" fontFamily="monospace" color="#AC8FFF" letterSpacing="wide">
          {time.minutes}
        </Text>
        <Text fontFamily="inter" fontWeight="400" color="#C6C6C6">
          MIN
        </Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text fontSize="2xl" fontFamily="monospace" color="#AC8FFF" letterSpacing="wide">
          {time.seconds}
        </Text>
        <Text fontFamily="inter" fontWeight="400" color="#C6C6C6">
          SEC
        </Text>
      </Box>
    </HStack>
  );
};
