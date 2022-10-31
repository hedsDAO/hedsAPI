import { Box, BoxProps, Center, Circle, Container, Divider, Icon, Stack, Text } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import DateCountdown from '@/common/countdown/DateCountdown';
import { IconCheck } from '@tabler/icons';
import { DateTime } from 'luxon';
import { formatTimestamp } from '@/utils';

class HedsTapeTimeline {
  titles: Array<string> = ['sample', 'submit', 'vote', 'mint'];
  description: Array<string> = ['download the sample audio', 'submit your flip of the sample', 'vote on your favorite submissions', 'mint the curated tape'];
}

const Timeline = () => {
  const [deadlines, setDeadlines] = useState<Array<boolean>>();
  const stepNames = new HedsTapeTimeline();
  const mockTimeline = [
    '7 October 2022 12:00:00 GMT-07:00',
    '14 October 2022 12:00:00 GMT-07:00',
    '21 October 2022 12:00:00 GMT-07:00',
    '30 November 2022 12:00:00 GMT-07:00',
  ];
  let globTime = DateTime.now().setZone('utc');
  let time = globTime.toLocaleString({
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
  formatTimestamp(time);

  useEffect(() => {
    const deadlineTank: Array<boolean> = [];
    const currentTime = new Date();
    mockTimeline.map((deadline) => {
      const time = Date.parse(deadline) - Date.parse(String(currentTime));
      if (time < 0) deadlineTank.push(true);
      else deadlineTank.push(false);
    });
    setDeadlines(deadlineTank);
  }, []);

  return (
    <Box bg="bg-surface">
      <Container py={{ base: '4', md: '8' }}>
        <Center>
          <Stack spacing="0">
            {deadlines?.length &&
              deadlines.map((step, i) => (
                <Stack key={`${i}` + step} spacing="4" direction="row">
                  <Stack spacing="0" align="center">
                    <Circle
                      size="8"
                      bg={deadlines[i] ? 'green.200' : 'gray.200'}
                      borderWidth={deadlines[i] ? '0' : '2px'}
                      borderColor={!deadlines[i] ? 'accent' : 'inherit'}
                    >
                      {deadlines[i] ? <Icon as={IconCheck} color="inverted" boxSize="5" /> : <Circle bg={!deadlines[i] ? 'accent' : 'border'} size="3" />}
                    </Circle>
                    <Divider
                      orientation="vertical"
                      borderWidth="1px"
                      borderColor={deadlines[i] ? 'gray.200' : deadlines?.length == i + 1 ? 'transparent' : 'inherit'}
                    />
                  </Stack>
                  <Stack spacing="0.5" pb={deadlines?.length == i + 1 ? '0' : '8'}>
                    <Text color="emphasized" fontWeight="semibold">
                      {stepNames.titles[i]}
                    </Text>
                    <Text fontSize={'xs'} color="gray.500">
                      {stepNames.description[i]}
                    </Text>
                    {!deadlines[i] && !!deadlines?.[i - 1] && <DateCountdown deadline={mockTimeline[i]} />}
                  </Stack>
                </Stack>
              ))}
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};

export default Timeline;
