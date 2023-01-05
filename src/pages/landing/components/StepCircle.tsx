import { Icon, SquareProps } from '@chakra-ui/react';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';

interface RadioCircleProps extends SquareProps {
  isCompleted: boolean;
}

export const StepCircle = (props: RadioCircleProps) => {
  const { isCompleted } = props;

  return <>{isCompleted ? <Icon as={IconCircleCheck} color="black" boxSize="8" /> : <Icon as={IconCircleDashed} boxSize="8" />}</>;
};
