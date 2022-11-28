import { Box, Container, Divider, Flex, Stack, Tab, TabList, Tabs, VStack } from '@chakra-ui/react';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, SplitsBalanceAlert, UserCard, Submissions, Collection, Tracks } from '../components';
import { ProfilePicture, DisplayName, Description, Badges, Samples, Banner } from '@/common/user';
import { useState } from 'react';

export const User = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
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
                          <Tab>{text}</Tab>
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

{
  /* <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={[2, 4, 8, 12]} px={[12, 8, 4, 2]} py={2}>
        <Stack direction={'column'}>

          <ProfilePicture />
          <SettingsButton />
          <Flex flexDirection={'column'} gap={6} pt={2} alignItems={'start'}>
            <Badges />
            <DisplayName />
          </Flex>
          <Description />
          <Flex alignItems={'end'} direction={'row'} gap={2} pt={2}>
            <TwitterLinkButton />
            <CopyWalletButton />
            <VerifyTwitterButton />
          </Flex>
        </Stack>
        <Stack mt={{ base: '0', md: '28' }} direction={'column'} spacing="10" width={'full'}>
          <SplitsBalanceAlert />
          <Tracks />
          <Submissions />
          <Collection />
          <Samples />
        </Stack>
      </Flex> */
}
