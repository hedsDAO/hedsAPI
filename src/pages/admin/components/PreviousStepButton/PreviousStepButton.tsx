import { Button } from '@chakra-ui/react';

export const PreviousStepButton = ({ onClick }: { onClick: () => void }) => (
  <Button fontFamily="space" fontWeight="light" letterSpacing="wider" borderRadius="lg" size="sm" onClick={onClick}>
    BACK
  </Button>
);
