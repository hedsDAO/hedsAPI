import { FC } from 'react';
import { Badge } from '@chakra-ui/react';

type BadgeStatus = 'closed' | 'open' | 'upcoming';

interface OwnProps {
  type: BadgeStatus;
  variant?: string;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export const HedsBadge: FC<OwnProps> = ({ type, variant = 'outline', fontSize = 'xs' }) => {
  return (
    <Badge variant={variant} fontSize={fontSize}>
      closed
    </Badge>
  );
};
