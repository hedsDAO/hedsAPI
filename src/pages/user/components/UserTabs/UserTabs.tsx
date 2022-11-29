import { Dispatch, store } from '@/store';
import { Box, Container, Divider, Stack, Tab, TabList, Tabs, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collection, Submissions, Tracks, Samples } from '../';

const UserTabs = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentTab = useSelector(store.select.userModel.selectCurrentTab);
  return (
    <Stack spacing={1} direction={'column'} w={'full'}>
      <VStack alignItems={'start'} mt={{ base: '0', md: '20' }}>
        <Box as="section" bg="bg-surface">
          <Container px={0} pt={{ base: '5', md: '10' }} pb={{ base: '2', md: '5' }}>
            <Stack>
              <Tabs defaultIndex={currentTab} onChange={(e) => dispatch.userModel.setCurrentTab(e)} size="sm" variant="with-line">
                <TabList fontWeight={'medium'} gap={5}>
                  {['Collection', 'Submissions', 'Tracks', 'Samples'].map((text: string, index: number) =>
                    currentTab === index ? (
                      <Tab key={text + index} textColor={'white'} rounded={'full'} bg="blackAlpha.800">
                        {text}
                      </Tab>
                    ) : (
                      <Tab key={text + index} _hover={{ bg: 'blackAlpha.800', textColor: 'white' }} rounded={'full'}>
                        {text}
                      </Tab>
                    ),
                  )}
                </TabList>
              </Tabs>
            </Stack>
          </Container>
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
