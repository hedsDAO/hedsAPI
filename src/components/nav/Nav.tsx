import { Dispatch, store } from '@/store';
import { Flex, Button, Box } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Nav = ({ tabs }: { tabs: string[] }) => {
  const dispatch = useDispatch<Dispatch>();
  const currentTabs = useMemo(() => [...tabs], []);
  const selectedTab = useSelector(store.select.navModel.selectCurrentTab);
  return (
    <Flex justifyContent={{ base: 'center', lg: 'start' }} p={6} gap={2}>
      {currentTabs.map((tab, index) => (
        <Button
          // shadow="sm"
          key={tab + index}
          fontSize={{ base: 'xs', lg: 'sm' }}
          size={{ base: 'xs', lg: 'sm' }}
          _hover={selectedTab === index ? { bg: 'transparent', color: 'black' } : { bg: 'transparent', color: 'blackAlpha.500' }}
         
          letterSpacing={'0.25rem'}
          textAlign="center"
          rounded="sm"
          borderColor={'transparent'}
          // border={'1px solid black'}
          // bg={selectedTab === index ? 'black' : 'white'}
          bg="transparent"
          color={selectedTab === index ? 'black' : 'blackAlpha.300'}
          textTransform="uppercase"
          onClick={useCallback(() => {
            dispatch.navModel.setCurrentTab(index);
          }, [dispatch, index])}
        >
          {tab}
        </Button>
      ))}
    </Flex>
  );
};
