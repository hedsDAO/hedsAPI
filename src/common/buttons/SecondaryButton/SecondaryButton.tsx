import { Button } from '@chakra-ui/react';

const SecondaryButton = ({ onClick, disabled, children }: { onClick: Function; disabled?: boolean; children: any }) => {
  return (
    <Button size={'sm'} onClick={() => onClick()} className="border" borderColor="gray.300" bg="gray.200" _hover={{ bg: 'gray.300', borderColor: 'gray.700' }}>
      {children}
    </Button>
  );
};

export default SecondaryButton;
