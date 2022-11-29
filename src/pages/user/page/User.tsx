import { Box, Flex, VStack } from '@chakra-ui/react';
import { UserCard, UserTabs, Banner } from '../components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

export const User = () => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    return () => {
      dispatch.userModel.clearCurrentUserState();
    };
  }, []);
  return (
    <Box>
      <Banner />
      <Flex
        px={{ base: '5', lg: '2' }}
        alignItems={{ base: 'center', lg: 'normal' }}
        direction={{ base: 'column', lg: 'row' }}
        gap={{ lg: 10 }}
        mx={'auto'}
        maxW={'6xl'}
      >
        <UserCard />
        <UserTabs />
      </Flex>
    </Box>
  );
};
