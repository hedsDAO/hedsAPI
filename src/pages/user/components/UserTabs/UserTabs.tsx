import { Dispatch, RootState, store } from '@/store';
import { isEmpty } from '@/utils';
import { Box, Button, Container, Divider, Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Tab, TabList, Tabs, Text, VStack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Collection, Submissions, Tracks, Samples, RefreshCollectionButton } from '../';

const UserTabs = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const [tabs, setTabs] = useState<Array<string>>();
  const [elements, setElements] = useState<Array<JSX.Element>>([<Collection />]);
  const currentUserWallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const currentTab = useSelector(store.select.userModel.selectCurrentTab);
  const samples = useSelector(store.select.userModel.selectCurrentUserSamples);
  const allTracks = useSelector(store.select.userModel.selectCurrentUserAllTracks);
  const submissions = useSelector(store.select.userModel.selectCurrentUserSubmissions);
  useEffect(() => {
    let tabContainer = [];
    let elementContainer = [];
    tabContainer.push('Collection');
    elementContainer.push(<Collection />);
    if (!isEmpty(submissions)) {
      tabContainer.push('Submissions');
      elementContainer.push(<Submissions />);
    }
    if (!isEmpty(samples)) {
      tabContainer.push('Samples');
      elementContainer.push(<Samples />);
    }
    if (!isEmpty(allTracks)) {
      tabContainer.push('Tracks');
      elementContainer.push(<Tracks />);
    }
    setTabs(tabContainer);
    setElements(elementContainer);
  }, [samples, allTracks, submissions, currentUserWallet]);

  useEffect(() => {
    if (tabs?.length > currentTab) dispatch.userModel.setCurrentTab(0);
  }, [pathname]);

  return (
    <Stack spacing={1} direction={'column'} w={'full'}>
      <VStack alignItems={'start'} mt={{ base: '10', lg: '20' }}>
        <Container
          display={{ base: 'none', lg: 'flex' }}
          mx={2}
          minW="full"
          as={Flex}
          justifyContent={'space-between'}
          px={{ lg: 2 }}
          pt={{ base: '5', md: '10' }}
          pb={{ base: '2', md: '3' }}
        >
          <Tabs onChange={(e) => dispatch.userModel.setCurrentTab(e)} size="sm" variant="with-line">
            <TabList fontWeight={'medium'} gap={5}>
              {tabs?.length &&
                tabs.map((text: string, index: number) =>
                  currentTab === index ? (
                    <Tab gap={-1} key={index} textColor={'white'} rounded={'full'} background="blackAlpha.800">
                      {text}
                    </Tab>
                  ) : (
                    <Tab key={index} _hover={{ background: 'blackAlpha.800', textColor: 'white' }} rounded={'full'}>
                      {text}
                    </Tab>
                  ),
                )}
            </TabList>
          </Tabs>
          {currentTab === 0 && <RefreshCollectionButton />}
        </Container>
        <Box display={{ base: 'flex', lg: 'none' }} px={5} justifyContent="space-between" alignItems={'end'} as="section" width={'full'}>
          <Text fontWeight={'semibold'} key={currentTab}>
            {tabs?.[currentTab]}
          </Text>
          <Flex gap={1}>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton size="sm" isActive={isOpen} as={Button}>
                    <ChevronDownIcon height="12" width="12" />
                  </MenuButton>
                  <MenuList mt={2}>
                    {tabs?.length &&
                      tabs.map((text: string, index: number) => {
                        return (
                          <MenuItem
                            disabled={index === currentTab}
                            _focus={{ bg: 'white' }}
                            _active={{ bg: 'white' }}
                            onClick={() => {
                              dispatch.userModel.setCurrentTab(index);
                            }}
                            key={index + text}
                          >
                            {tabs[index]}
                          </MenuItem>
                        );
                      })}
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
        </Box>
        <Stack px={{ base: 4, lg: 2 }} direction={'column'} spacing="2" width={'full'}>
          {elements[currentTab]}
        </Stack>
      </VStack>
    </Stack>
  );
};

export default UserTabs;
