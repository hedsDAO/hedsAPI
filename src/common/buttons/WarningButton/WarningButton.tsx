import { Button } from '@chakra-ui/react';

const WarningButton = ({ onClick, size, disabled, children }: { onClick: Function; size?: string; disabled?: boolean; children: any }) => {
  return (
    <Button
      size={size || 'sm'}
      onClick={() => onClick()}
      className="border"
      borderColor="red.300"
      bg="red.200"
      _hover={{ bg: 'red.300', borderColor: 'red.700' }}
    >
      {children}
    </Button>
  );
};

export default WarningButton;
