import { Fragment } from 'react';
import { LabelBadge } from '@/common/badges';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Divider, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { Dispatch, RootState } from '@/store';
import { selectCurrentTapeBpm, selectCurrentTapeTimeline } from '@/pages/tapes/store/selectors';
import { PrimaryAlert, WarningAlert } from '@/common/alerts';
import { DateTime } from 'luxon';
import {
  BPM_LABEL,
  CHECKBOX_TEXT,
  CLOSED_TEXT,
  COUNTDOWN_TEXT,
  LENGTH_LABEL,
  LENGTH_VALUE,
  SAMPLE_LABEL,
  SAMPLE_REQUIREMENTS_TITLE,
  SAMPLE_VALUE,
} from '../../models/constants';

const Disclaimer = () => {
  const dispatch = useDispatch<Dispatch>();
  const now = DateTime.now().setZone('utc').toMillis();
  const loading = useSelector((state: RootState) => state.loading.models.sampleModel);
  const { isChecked } = useSelector((state: RootState) => state.sampleModel);
  const { end } = useSelector(selectCurrentTapeTimeline).submit;
  const bpm = useSelector(selectCurrentTapeBpm);

  return (
    <Flex data-testid="sample-disclaimer" direction={'column'}>
      {!loading && now < end ? (
        <Fragment>
          <Divider my={5} />
          <PrimaryAlert countdown={end}>{COUNTDOWN_TEXT}</PrimaryAlert>
          <Flex mt={5} px={2} direction={'column'}>
            <Text fontSize="xl" textColor={'blackAlpha.800'} fontWeight={'bold'}>
              {SAMPLE_REQUIREMENTS_TITLE}
            </Text>
            <Flex mt={4} gap={2} direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'start', lg: 'center' }}>
              <LabelBadge label={BPM_LABEL} text={bpm.toString()} textColor={'green.600'} />
              <LabelBadge label={LENGTH_LABEL} text={LENGTH_VALUE} textColor={'orange.600'} />
              <LabelBadge label={SAMPLE_LABEL} text={SAMPLE_VALUE} textColor={'blue.600'} />
            </Flex>
            <Checkbox mt={5} onChange={(e) => dispatch.sampleModel.setIsChecked(!isChecked)}>
              <Text fontSize={'xs'}>{CHECKBOX_TEXT}</Text>
            </Checkbox>
            <Divider my={5} />
          </Flex>
        </Fragment>
      ) : (
        <Fragment>
          <Divider my={5} />
          <Flex mb={5}>
            <WarningAlert>{CLOSED_TEXT}</WarningAlert>
          </Flex>
        </Fragment>
      )}
    </Flex>
  );
};

export default Disclaimer;
