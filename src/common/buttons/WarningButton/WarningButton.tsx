import { Button } from '@chakra-ui/react';

const WarningButton = ({ onClick, disabled, children }: { onClick: Function; disabled?: boolean; children: any }) => {
  return (
    <Button size={'sm'} onClick={() => onClick()} className="border" borderColor="red.300" bg="red.200" _hover={{ bg: 'red.300', borderColor: 'red.700' }}>
      {children}
    </Button>
  );
};

export default WarningButton;
