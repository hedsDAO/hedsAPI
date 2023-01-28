import { Button } from '@chakra-ui/react';

const PrimaryButton = ({
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
      isDisabled={disabled}
      _hover={{ bg: 'green.300', borderColor: 'green.400' }}
      bg="green.200"
      borderColor={'green.300'}
      className={'border'}
      size={size || 'sm'}
      rounded="md"
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
