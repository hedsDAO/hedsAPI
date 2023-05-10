import { Button, Center, HStack, Image, Text, VStack } from '@chakra-ui/react';
import HedLogo from '/public/heddot.png';
import * as styles from '@pages/404/screens/styles';

export const NotFound = () => {
  return (
    <Center {...styles.$centerStyles}>
      <VStack spacing={4}>
        <HStack>
          <Text {...styles.$numberStyles}>4</Text>
          <Image src={HedLogo} alt="Zero" boxSize="8rem" />
          <Text {...styles.$numberStyles}>4</Text>
        </HStack>
        <Text {...styles.$textStyles}>The Page You Were Looking For Does Not Exist</Text>
        <Button {...styles.$buttonStyles}>GO HOME</Button>
      </VStack>
    </Center>
  );
};
