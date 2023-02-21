import { BoxProps, Stack, Text } from '@chakra-ui/react';
import { StepCircle } from './StepCircle';
import { animated, SpringValue, AnimationProps } from 'react-spring';

interface StepProps extends BoxProps {
  title: string;
  description: string;
  isLastStep: boolean;
  dividerProps: any;
  dashedProps: any;
  checkProps: any;
  textProps: any;
}

export const Step = (props: StepProps) => {
  const { isLastStep, title, description, dividerProps, dashedProps, checkProps, textProps, ...stackProps } = props;

  return (
    <Stack spacing="4" direction="row" {...stackProps}>
      <Stack spacing="9" align="center" direction="column">
        <StepCircle dashedProps={dashedProps} checkProps={checkProps} />
        {!isLastStep && <animated.div style={{ borderLeft: '1px solid black', ...dividerProps }} />}
      </Stack>
      <Stack spacing="0.5" pb={isLastStep ? '0' : '8'} paddingLeft="0.5rem">
        <animated.h5 style={{ fontWeight: '600', ...textProps }}>{title}</animated.h5>
        <animated.p style={textProps}>{description}</animated.p>
      </Stack>
    </Stack>
  );
};
