import { Badge } from '@chakra-ui/react';

const OpenBadge = ({premintOpen}: {premintOpen?: boolean})  => {
  return (
    <Badge colorScheme={'green'} variant={'outline'} fontSize="xs">
      {premintOpen ? 'PREMINT OPEN' : 'OPEN'}
    </Badge>
  );
};

export default OpenBadge;
