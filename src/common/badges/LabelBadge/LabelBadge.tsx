import { Badge, ColorProps, Text } from '@chakra-ui/react';

const LabelBadge = ({ label, text, textColor }: { label: string; text: string; textColor: ColorProps['textColor'] }) => {
  return (
    <Badge data-testid={`label-badge-${label}`} display={'flex'} bg="gray.200" fontSize={'xs'} py={1} px={2}>
      {label}
      <Text fontWeight={'semibold'} textColor={textColor} ml={1}>
        {text}
      </Text>
    </Badge>
  );
};

export default LabelBadge;
