import { BoxProps, Stack, Text } from '@chakra-ui/react';
import { StepCircle } from './StepCircle';
import { animated } from 'react-spring';

interface StepProps extends BoxProps {
  title: string;
  description: string;
  isLastStep: boolean;
  dividerProps: any;
  dashedProps: any;
  checkProps: any;
}

export const Step = (props: StepProps) => {
  const { isLastStep, title, description, dividerProps, dashedProps, checkProps, ...stackProps } = props;

  return (
    <Stack spacing="4" direction="row" {...stackProps}>
      <Stack spacing="9" align="center" direction="column">
        <StepCircle dashedProps={dashedProps} checkProps={checkProps} />
        {!isLastStep && <animated.div style={{ borderLeft: '1px solid black', ...dividerProps }} />}
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
