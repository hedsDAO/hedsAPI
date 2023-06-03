import { Avatar, Flex, Text, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import HedLogo from '/public/heddot.png';

export const Footer = () => {

  const navigate = useNavigate();

  return (
    <Flex py={6} px={8} mt={10} justifyContent={'space-between'}>
      <Flex display={{ base: 'none', lg: 'flex' }} ml={-1} gap={4} alignItems={'center'}>
        <Avatar borderRadius={'none'} size="xs" src={HedLogo} />
        <Flex gap={2} alignItems={'baseline'}>
          <Text letterSpacing={'wide'} fontFamily={'space mono'} opacity={'80%'} fontWeight={100} fontSize={'md'} color="white">
            heds
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent={'space-between'} fontFamily={'space mono'} minW={{ base: 'full', lg: 'auto' }} gap={6}>
        <Flex alignItems={'center'} gap={3}>
          <Text onClick={() => {
                  if (window) window?.scrollTo(0, 0);
                  navigate(`/faq`)
                }} 
                letterSpacing={'widest'} opacity={'70%'} fontSize={'2xs'} color={'white'}  _hover={{ cursor: 'pointer' }}>
            FAQ
          </Text>
          {/* <Text letterSpacing={'widest'} opacity={'70%'} fontSize={'2xs'} color={'white'}>
            PRIVACY
          </Text>
          <Text letterSpacing={'widest'} opacity={'70%'} fontSize={'2xs'} color={'white'}>
            TERMS
          </Text> */}
        </Flex>
        <Flex fontSize={{ base: 'sm', lg: 'md' }} alignItems={'center'} gap={4} color="white" opacity={'70%'}>
          <a href="https://twitter.com/hedsDAO" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://discord.gg/cc9wF23r" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-discord"></i>
          </a>
        </Flex>
      </Flex>
    </Flex>
  );
};
