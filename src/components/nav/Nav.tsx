import { Dispatch, store } from '@/store';
import { Flex, Button, Box } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Nav = ({ tabs }: { tabs: string[] }) => {
  const dispatch = useDispatch<Dispatch>();
  const currentTabs = useMemo(() => [...tabs], []);
  const selectedTab = useSelector(store.select.navModel.selectCurrentTab);
  return (
    <Flex p={6}>
      <Box>
        {currentTabs.map((tab, index) => (
          <Button
            shadow="md"
            key={tab + index}
            px={6}
            fontSize={{ base: 'xs', lg: 'sm' }}
            size={'sm'}
            fontWeight="medium"
            rounded="full"
            border={'1px solid black'}
            mr={4}
            bg={selectedTab === index ? 'black' : 'white'}
            color={selectedTab === index ? 'white' : 'black'}
            textTransform="uppercase"
            onClick={useCallback(() => {
              dispatch.navModel.setCurrentTab(index);
            }, [dispatch, index])}
          >
            {tab}
          </Button>
        ))}
      </Box>
    </Flex>
  );
};
