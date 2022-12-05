import { FC, ReactChild } from 'react';
import { Button } from '@chakra-ui/react';

// can be moved to constants folder
const COLORS = {
  hover: {
    primary: { bg: 'green.300', borderColor: 'green.400' },
    secondary: { bg: 'gray.300', borderColor: 'gray.700' },
    link: { bg: 'blue.300', borderColor: 'blue.400' },
    warning: { bg: 'red.300', borderColor: 'red.700' },
  },
  button: {
    primary: { bg: 'green.200', borderColor: 'green.300' },
    secondary: { bg: 'gray.300', borderColor: 'gray.700' },
    link: { bg: 'blue.200', borderColor: 'blue.300' },
    warning: { bg: 'red.200', borderColor: 'red.300' },
  },
};

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
type ButtonType = 'primary' | 'secondary' | 'warning' | 'link';

interface OwnProps {
  isLoading?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonType;
  children: ReactChild;
}

export const HedsButton: FC<OwnProps> = ({ isLoading = false, size = 'sm', disabled = false, onClick, type = 'primary', children }) => {
  return (
    <Button
      isLoading={isLoading}
      onClick={() => onClick()}
      disabled={disabled}
      _hover={COLORS.hover[type]}
      bg={COLORS.button[type].bg}
      borderColor={COLORS.button[type].borderColor}
      className={'border'}
      size={size}
      rounded="md"
    >
      {children}
    </Button>
  );
};
