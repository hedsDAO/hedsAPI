import { BoxProps, Stack, Text } from '@chakra-ui/react';
import { StepCircle } from './StepCircle';
import { animated, useInView } from 'react-spring';

interface StepProps extends BoxProps {
  title: string;
  description: string;
  isLastStep: boolean;
  multiplier: number;
}

export const Step = (props: StepProps) => {
  const { isLastStep, title, description, multiplier, ...stackProps } = props;
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
