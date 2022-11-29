import { Box, Container, Divider, Flex, Stack, Tab, TabList, Tabs, VStack } from '@chakra-ui/react';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, SplitsBalanceAlert, UserCard, Submissions, Collection, Tracks } from '../components';
import { ProfilePicture, DisplayName, Description, Badges, Samples, Banner } from '@/common/user';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

export const User = () => {
  const dispatch = useDispatch<Dispatch>();
  const [currentTab, setCurrentTab] = useState<number>(0);
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
        gap={10}
        mx={'auto'}
        maxW={'6xl'}
      >
        <VStack>
          <UserCard />
        </VStack>
        <Stack direction={'column'} spacing="2" width={'full'}>
          <VStack alignItems={'start'} mt={{ base: '0', md: '20' }}>
            <Box as="section" bg="bg-surface">
              <Container px={0} pt={{ base: '5', md: '10' }} pb={{ base: '2', md: '5' }}>
                <Stack>
                  <Tabs defaultIndex={currentTab} onChange={(e) => setCurrentTab(e)} size="sm" variant="with-line">
                    <TabList fontWeight={'medium'} gap={5}>
                      {['Collection', 'Submissions', 'Tracks'].map((text: string, index: number) =>
                        currentTab === index ? (
                          <Tab textColor={'white'} rounded={'full'} bg="blackAlpha.800">
                            {text}
                          </Tab>
                        ) : (
                          <Tab _hover={{ bg: 'blackAlpha.800', textColor: 'white' }} rounded={'full'}>
                            {text}
                          </Tab>
                        ),
                      )}
                    </TabList>
                  </Tabs>
                </Stack>
              </Container>
            </Box>
          </VStack>
          <Divider border={'1px'} size="md" />
          {currentTab === 0 ? <Collection /> : currentTab === 1 ? <Submissions /> : <Tracks />}
        </Stack>
      </Flex>
    </Box>
  );
};
