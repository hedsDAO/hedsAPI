import { useState, useEffect } from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import * as styles from '@/modals/screens/download/components/Countdown/styles';

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

  const formatStringNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const countDownDate = new Date(epochTime).getTime();
      const now = new Date().getTime();

      const distance = countDownDate - now;

      setTime({
        days: formatStringNumber(Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: formatStringNumber(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: formatStringNumber(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: formatStringNumber(Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [epochTime]);

  return (
    <HStack {...styles.$countdownStackStyles}>
      <Box>
        <Text {...styles.$countdownBigTextStyles}>{time.days}</Text>
        <Text {...styles.$countdownSmallTextStyles}>DAYS</Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text {...styles.$countdownBigTextStyles}>{time.hours}</Text>
        <Text {...styles.$countdownSmallTextStyles}>HRS</Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text {...styles.$countdownBigTextStyles}>{time.minutes}</Text>
        <Text {...styles.$countdownSmallTextStyles}>MIN</Text>
      </Box>
      <Text>:</Text>
      <Box>
        <Text {...styles.$countdownBigTextStyles}>{time.seconds}</Text>
        <Text {...styles.$countdownSmallTextStyles}>SEC</Text>
      </Box>
    </HStack>
  );
};
