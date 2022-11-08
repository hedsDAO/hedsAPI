import { selectCurrentTapeCurator, selectCurrentTapeTimeline } from '@/pages/tapes/store/selectors';
import { Dispatch, RootState } from '@/store';
import { Checkbox, Divider, Flex, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Disclaimer = () => {
  const { isChecked } = useSelector((state: RootState) => state.sampleModel);
  const curator = useSelector(selectCurrentTapeCurator);
  const dispatch = useDispatch<Dispatch>();
  const now = DateTime.now().setZone('utc').toMillis();
  const timeline = useSelector(selectCurrentTapeTimeline);
  return (
    <Fragment>
      <Divider my={3} />
      {now < timeline?.submit?.end ? (
        <Flex px={1} direction={'column'}>
          <Text mb={1} textColor={'red.400'} fontWeight={'bold'}>
            Disclaimer
          </Text>
          <Text textColor={'gray.700'} fontSize="xs">
            My submission does not contain and copyrighted material and adheres to the bpm and length requirements.
          </Text>
          <Checkbox mt={3} onChange={(e) => dispatch.sampleModel.setIsChecked(!isChecked)}>
            <Text fontSize={'xs'}>I agree</Text>
          </Checkbox>
        </Flex>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default Disclaimer;
