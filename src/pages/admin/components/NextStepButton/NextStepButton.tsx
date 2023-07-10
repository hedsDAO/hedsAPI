import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

interface OwnProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
  includeIcon?: boolean;
}

export const NextStepButton = ({ onClick, disabled, text, includeIcon }: OwnProps) => {
  return (
    <Button
      colorScheme="purple"
      fontFamily="space"
      fontWeight="light"
      letterSpacing="wider"
      borderRadius="lg"
      size="sm"
      rightIcon={includeIcon ? <ArrowForwardIcon /> : undefined}
      onClick={onClick}
      isDisabled={disabled}
    >
      {text}
    </Button>
  );
};
