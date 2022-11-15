import { Button } from '@chakra-ui/react';

const SecondaryButton = ({ onClick, size, disabled, children }: { onClick: Function; size?: string; disabled?: boolean; children: any }) => {
  return (
    <Button
      rounded="md"
      size={size || 'sm'}
      onClick={() => onClick()}
      className="border"
      borderColor="gray.300"
      bg="gray.200"
      _hover={{ bg: 'gray.300', borderColor: 'gray.700' }}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
