import { useState } from 'react';
import { BoxProps, Divider, Stack, Text } from '@chakra-ui/react';
import { StepCircle } from './StepCircle';

import { useSpring, animated, config, useInView } from 'react-spring';
import { Waypoint } from 'react-waypoint';

interface StepProps extends BoxProps {
  title: string;
  description: string;
  isCompleted: boolean;
  isLastStep: boolean;
  order: number;
}
//TODO: clean up unused props
export const Step = (props: StepProps) => {
  const [inView, setInView] = useState(false);

  const { isCompleted, isLastStep, title, description, order, ...stackProps } = props;

  return (
    <Stack spacing="4" direction="row" {...stackProps}>
      <Stack spacing="0" align="center">
        {/* <Waypoint onEnter={() => setInView(true)}> */}
        <StepCircle order={order} />
        {/* <Divider orientation="vertical" borderWidth="1px" borderColor={isCompleted ? 'accent' : isLastStep ? 'transparent' : 'inherit'} /> */}
        {/* </Waypoint> */}
      </Stack>
      <Stack spacing="0.5" pb={isLastStep ? '0' : '8'}>
        <Text color="emphasized" fontWeight="medium">
          {title}
        </Text>
        <Text color="muted">{description}</Text>
      </Stack>
    </Stack>
  );
};
