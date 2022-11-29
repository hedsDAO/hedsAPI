import { Dispatch, store } from '@/store';
import { Box, Button, Container, Divider, Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Tab, TabList, Tabs, Text, VStack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collection, Submissions, Tracks, Samples, RefreshCollectionButton } from '../';

const UserTabs = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentTab = useSelector(store.select.userModel.selectCurrentTab);
  const collection = useSelector(store.select.userModel.selectCurrentUserCollection);
  const samples = useSelector(store.select.userModel.selectCurrentUserSamples);
  const tracks = useSelector(store.select.userModel.selectCurrentUserTracks);
  const submissions = useSelector(store.select.userModel.selectCurrentUserSubmissions);
  const tabs = ['Collection', 'Submissions', 'Tracks', 'Samples'];
  console.log(currentTab);
  return (
    <Stack spacing={1} direction={'column'} w={'full'}>
      <VStack alignItems={'start'} mt={{ base: '10', lg: '20' }}>
        <Box display={{ base: 'none', lg: 'inline' }} as="section">
          <Container px={0} pt={{ base: '5', md: '10' }} pb={{ base: '2', md: '5' }}>
            <Stack>
              <Tabs onChange={(e) => dispatch.userModel.setCurrentTab(e)} size="sm" variant="with-line">
                <TabList fontWeight={'medium'} gap={5}>
                  {tabs.map((text: string, index: number) =>
                    currentTab === index ? (
                      <Tab key={index} textColor={'white'} rounded={'full'} background="blackAlpha.800">
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
            </Stack>
          </Container>
        </Box>
        <Box display={{ base: 'flex', lg: 'none' }} px={2} justifyContent="space-between" alignItems={'end'} as="section" width={'full'}>
          <Text fontWeight={'semibold'} key={currentTab}>
            {tabs[currentTab]}
          </Text>
          <Flex gap={1}>
            {currentTab === 0 && <RefreshCollectionButton />}
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton size="sm" isActive={isOpen} as={Button}>
                    <ChevronDownIcon height="12" width="12" />
                  </MenuButton>
                  <MenuList mt={2}>
                    {tabs.map((text: string, index: number) => {
                      return (
                        <MenuItem
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
        <Stack direction={'column'} spacing="2" width={'full'}>
          <Divider border={'1px'} size="md" />
          {currentTab === 0 ? <Collection /> : currentTab === 1 ? <Submissions /> : currentTab === 2 ? <Tracks /> : <Samples />}
        </Stack>
      </VStack>
    </Stack>
  );
};

export default UserTabs;
