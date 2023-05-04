import { Dispatch, store } from '@/store';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Button, Box, MenuList, MenuButton, Menu, MenuItem, Text } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Nav = ({ tabs }: { tabs: string[] }) => {
  const dispatch = useDispatch<Dispatch>();
  const currentTabs = useMemo(() => [...tabs], []);
  const selectedTab = useSelector(store.select.navModel.selectCurrentTab);
  return (
    <>
      <Flex display={{ base: 'none', lg: 'flex' }} mt={'2 !important'} justifyContent={{ base: 'start', lg: 'start' }} gap={3}>
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
      <Box justifyContent={'start'} alignItems={'center'} display={{ base: 'flex', lg: 'none' }}>
        <Menu>
          <MenuButton as={Button} bg="transparent" _hover={{ bg: 'transparent' }}>
            <HamburgerIcon color="heds.100" boxSize={5} />
          </MenuButton>
          <MenuList ml={2} rounded="sm" borderColor="heds.200" py={0}>
            {currentTabs.map((tab, index) => (
              <MenuItem
                fontFamily={'karla'}
                color={selectedTab === index ? 'black' : 'heds.200'}
                bg={selectedTab === index ? 'heds.100' : 'heds.bg3'}
                letterSpacing={'0.25rem'}
                textTransform="uppercase"
                fontSize="xs"
                key={tab + index + 'mobile'}
                borderColor={'black'}
                fontWeight={selectedTab === index ? 'semibold' : 'normal'}
                onClick={useCallback(() => {
                  dispatch.navModel.setCurrentTab(index);
                }, [dispatch, index])}
              >
                {tab}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Text letterSpacing={'0.25rem'} textTransform="uppercase" mr={2.5} fontWeight={'medium'} color={'heds.100'} fontSize="xs">
          {currentTabs[selectedTab]}
        </Text>
      </Box>
    </>
  );
};
