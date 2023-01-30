import { TapeCard } from '@/common/media';
import { TapesTab } from '@/modules/wrappers/store/tapesModel';
import { Dispatch, store } from '@/store';
import { Box, Grid, Heading, Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import * as gaEvents from '@/events';

export const Tapes = () => {
  const dispatch = useDispatch<Dispatch>();
  const allHedsTapes = useSelector(store.select.tapesModel.selectAllHedsTapes);
  const allCollabTapes = useSelector(store.select.tapesModel.selectAllCollabTapes);
  const tapeTabs = useSelector(store.select.tapesModel.selectTapeTabs);
  const currentTab = useSelector(store.select.tapesModel.selectCurrentTab);
  return (
    <Box minW="100vw" minH="100vh">
      <Flex px={6} bg="whiteAlpha.100" pt={5} alignItems={'center'} justifyContent="space-between">
        <Heading
          px={{ base: 0, lg: 2 }}
          className="animate__animated animate__fadeIn"
          fontWeight={'semibold'}
          letterSpacing={'widest'}
          size={['sm', 'md']}
          color={'gray.900'}
        >
          RELEASES
        </Heading>
        {/* TODO: remove tailwind styles, add chakra comps */}
        {tapeTabs?.length && (
          <Flex px={{ base: 0, lg: 2 }} gap={4}>
            {tapeTabs.map((tab, index) => (
              <Text
                fontSize={{ base: '2xs', lg: 'sm' }}
                fontFamily={'"Space Mono", monospace'}
                role="button"
                fontWeight={'light'}
                className={`${
                  index === currentTab ? 'underline underline-offset-[4.5px] decoration-1' : 'hover-underline-animation text-gray-500'
                } tracking-widest font-semibold`}
                onClick={() => {
                  dispatch.tapesModel.setCurrentTab(index);
                  if(tab === 'collabtape') {
                    gaEvents.clickToggleCollabTape();
                  }
                }}
                key={tab + index}
              >
                {tab}
              </Text>
            ))}
          </Flex>
        )}
      </Flex>
      <Grid pt={6} px={5} templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }} gap={3}>
        {allHedsTapes &&
          Object.keys(allHedsTapes)?.length &&
          currentTab === TapesTab.HEDSTAPE &&
          Object.values(allHedsTapes)
            ?.reverse()
            ?.map((tape, index) => {
              return <TapeCard key={tape.contract + index} tape={tape} />;
            })}
        {allCollabTapes &&
          Object.keys(allCollabTapes)?.length &&
          currentTab === TapesTab.COLLABTAPE &&
          Object.values(allCollabTapes)
            ?.reverse()
            ?.map((tape, index) => {
              return <TapeCard key={tape.contract + index} tape={tape} />;
            })}
      </Grid>
    </Box>
  );
};
