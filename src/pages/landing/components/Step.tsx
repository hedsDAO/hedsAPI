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
  multiplier: number;
}
//TODO: clean up unused props
export const Step = (props: StepProps) => {
  const { isCompleted, isLastStep, title, description, multiplier, ...stackProps } = props;
  const rootMarginPercentage = 30 + multiplier * 5;
  const [dividerRef, dividerProps] = useInView(
    () => ({
      from: {
        height: '0%',
      },
      to: {
        height: '100%',
      },
      config: {
        tension: 25,
      },
    }),
    {
      rootMargin: `-${rootMarginPercentage}% 0px`,
      once: true,
    },
  );
  return (
    <Stack spacing="4" direction="row" {...stackProps}>
      <Stack spacing="9" align="center" direction="column">
        <StepCircle multiplier={multiplier} />
        {!isLastStep && <animated.div ref={dividerRef} style={{ borderLeft: '1px solid black', ...dividerProps }} />}
        {/* <Divider orientation="vertical" borderWidth="1px" borderColor={isCompleted ? 'accent' : isLastStep ? 'transparent' : 'inherit'} /> */}
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
