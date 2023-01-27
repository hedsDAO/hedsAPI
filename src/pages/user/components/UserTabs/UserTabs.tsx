import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Flex, Stack, Text, Center, Heading, IconButton, Image, Skeleton } from '@chakra-ui/react';
import { Collection, Likes, Submissions, Tracks, Samples, RefreshCollectionButton } from '../';
import { Fragment, useEffect } from 'react';

const UserTabs = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentWallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const audioTabIndex = useSelector(store.select.userModel.selectAudioTabIndex);
  const engagementTabIndex = useSelector(store.select.userModel.selectEngagementTabIndex);
  const audioTabs = useSelector(store.select.userModel.selectAudioTabs);
  const engagementTabs = useSelector(store.select.userModel.selectEngagementTabs);
  const doesUserHavePublicSubmissions = useSelector(store.select.userModel.selectDoesUserHavePublicSubmissions);
  const isOnOwnPage = useSelector(store.select.userModel.selectIsOwnPage);
  const submissions = useSelector(store.select.userModel.selectCurrentUserSubmissions);
  const samples = useSelector(store.select.userModel.selectCurrentUserSamples);
  const tracks = useSelector(store.select.userModel.selectCurrentUserTracks);
  useEffect(() => {
    if (audioTabs?.length && currentWallet?.length && !doesUserHavePublicSubmissions && audioTabs?.includes('submissions') && !isOnOwnPage) {
      dispatch.userModel.setAudioTabs(audioTabs?.filter((tab) => tab !== 'submissions'));
    }
  }, [audioTabs]);
  return (
    <Fragment>
      <Stack minH="100vh" pt={{ base: '5', lg: '10' }}>
        {audioTabs?.length && (
          <Flex gap={3} mt={{ base: '12', lg: '20' }}>
            {audioTabs.map((tab, index) => (
              <Text
                role="button"
                className={`${
                  index === audioTabIndex ? 'underline underline-offset-[5px] decoration-1' : 'hover-underline-animation text-gray-500'
                } uppercase tracking-widest text-sm lg:text-md font-semibold`}
                onClick={() => dispatch.userModel.setAudioTabIndex(index)}
                key={tab + index}
              >
                {tab}
              </Text>
            ))}
          </Flex>
        )}
        {audioTabs?.[audioTabIndex] === 'submissions' && <Submissions />}
        {audioTabs?.[audioTabIndex] === 'tracks' && <Tracks />}
        {audioTabs?.[audioTabIndex] === 'samples' && <Samples />}
        {audioTabs?.length && <Divider pt={2} />}
        <Flex pt={audioTabs?.length ? 10 : 0} gap={3} mt={{ base: '12', lg: '20' }} w="full" justifyContent={'space-between'}>
          {engagementTabs?.length && (
            <Flex gap={2}>
              {engagementTabs.map((tab, index) => (
                <Text
                  role="button"
                  className={`${
                    index === engagementTabIndex ? 'underline underline-offset-[5px] decoration-1' : 'hover-underline-animation text-gray-500'
                  } uppercase tracking-widest text-xs lg:text-sm font-semibold`}
                  onClick={() => dispatch.userModel.setEngagementTabIndex(index)}
                  key={tab + index}
                >
                  {tab}
                </Text>
              ))}
            </Flex>
          )}
          {engagementTabs?.[engagementTabIndex] === 'collection' && <RefreshCollectionButton />}
        </Flex>
        {engagementTabs?.[engagementTabIndex] === 'collection' && <Collection />}
        {engagementTabs?.[engagementTabIndex] === 'likes' && <Likes />}
      </Stack>
    </Fragment>
  );
};

export default UserTabs;
