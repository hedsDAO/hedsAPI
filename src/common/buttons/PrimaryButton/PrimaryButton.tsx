import { Button } from '@chakra-ui/react';

const PrimaryButton = ({ isLoading, disabled, onClick, children }: { isLoading?: boolean; disabled?: boolean; onClick?: Function; children: any }) => {
  return (
    <Button
      isLoading={isLoading}
      onClick={() => onClick()}
      disabled={disabled}
      _hover={{ bg: 'green.200', borderColor: 'green.500' }}
      bg="green.100"
      borderColor={'green.200'}
      className={'border'}
      size={'sm'}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
