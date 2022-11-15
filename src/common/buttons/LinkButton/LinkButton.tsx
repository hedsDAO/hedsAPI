import { Button } from '@chakra-ui/react';

const LinkButton = ({
  isLoading,
  size,
  disabled,
  onClick,
  children,
}: {
  isLoading?: boolean;
  size?: string;
  disabled?: boolean;
  onClick?: Function;
  children: any;
}) => {
  return (
    <Button
      isLoading={isLoading}
      onClick={() => onClick()}
      disabled={disabled}
      _hover={{ bg: 'blue.300', borderColor: 'blue.400' }}
      bg="blue.200"
      borderColor={'blue.300'}
      className={'border'}
      size={size || 'sm'}
      rounded="md"
    >
      {children}
    </Button>
  );
};

export default LinkButton;
