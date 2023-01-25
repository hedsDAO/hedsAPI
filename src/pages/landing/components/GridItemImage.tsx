import { FC } from 'react';
import { Center, GridItem, Icon, VStack } from '@chakra-ui/react';
import { TablerIcon } from '@tabler/icons';
import { Number } from '@/pages/landing/components/Number';

interface OwnProps {
  num: number;
  text: string;
  icon: TablerIcon;
}

export const GridItemImage: FC<OwnProps> = ({ num, text, icon }) => {
  return (
    <Center borderColor="black" border="1px" borderRadius="0.3rem" borderStyle="dotted">
      <GridItem padding="3px">
        <VStack textAlign="center">
          <>
            <Number inputNum={num} color="black" size={['2rem', null, '3rem']} />
            {text}
            <Icon as={icon} boxSize={[10, null, 20]} />
          </>
        </VStack>
      </GridItem>
    </Center>
  );
};
