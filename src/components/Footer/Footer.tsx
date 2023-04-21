import { Avatar, Flex, Text } from '@chakra-ui/react';
import HedLogo from '@public/heddot.png';

export const Footer = () => {
  return (
    <Flex py={6} px={8} mt={10} justifyContent={'space-between'}>
      <Flex ml={-1} gap={4} alignItems={'center'}>
        <Avatar borderRadius={'none'} size="xs" src={HedLogo} />
        <Flex gap={2} alignItems={'baseline'}>
          <Text letterSpacing={'wide'} fontFamily={'karla'} opacity={'80%'} fontWeight={100} fontSize={'md'} color="white">
            heds
          </Text>
        </Flex>
      </Flex>
      <Flex gap={6}>
        <Flex gap={3}>
          <Text letterSpacing={'widest'} opacity={'70%'} fontSize={'2xs'} color={'white'}>
            PRIVACY
          </Text>
          <Text letterSpacing={'widest'} opacity={'70%'} fontSize={'2xs'} color={'white'}>
            TERMS
          </Text>
        </Flex>
        <Flex gap={4} color="white" opacity={'70%'}>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-discord"></i>
        </Flex>
      </Flex>
    </Flex>
  );
};
