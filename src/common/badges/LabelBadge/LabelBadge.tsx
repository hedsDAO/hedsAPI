import { forwardRef } from 'react';
import { Badge, ColorProps, Text } from '@chakra-ui/react';

interface OwnProps {
  label: string;
  text: string;
  textColor: ColorProps['textColor'];
}

const LabelBadge = forwardRef<HTMLInputElement, OwnProps>(({ label, text, textColor, ...rest }, ref) => (
  <Badge data-testid={`label-badge-${label}`} display={'flex'} bg="gray.200" fontSize={'xs'} py={1} px={2} ref={ref} {...rest}>
    {label}
    <Text fontWeight={'semibold'} textColor={textColor} ml={1}>
      {text}
    </Text>
  </Badge>
));

export default LabelBadge;
