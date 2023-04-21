import { Dispatch, store } from '@/store';
import { Flex, Button, Box } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Nav = ({ tabs }: { tabs: string[] }) => {
  const dispatch = useDispatch<Dispatch>();
  const currentTabs = useMemo(() => [...tabs], []);
  const selectedTab = useSelector(store.select.navModel.selectCurrentTab);
  return (
    <Flex mt={'2 !important'} justifyContent={{ base: 'start', lg: 'start' }} gap={2}>
      {currentTabs.map((tab, index) => (
        <Button
          fontFamily={'karla'}
          key={tab + index}
          fontSize={{ base: 'xs', lg: 'sm' }}
          size={{ base: 'xs', lg: 'sm' }}
          px={'1 !important'}
          _hover={{ bg: 'transparent', opacity: '90%' }}
          letterSpacing={'0.25rem'}
          textAlign="start"
          rounded="sm"
          borderColor={'transparent'}
          bg="transparent"
          color={'heds.100'}
          fontWeight={selectedTab === index ? 'bold' : 'normal'}
          opacity={selectedTab === index ? '100%' : '50%'}
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
