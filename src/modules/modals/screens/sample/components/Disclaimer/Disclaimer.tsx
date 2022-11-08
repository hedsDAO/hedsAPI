import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Checkbox, Divider, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { Dispatch, RootState } from '@/store';
import { selectCurrentTapeBpm, selectCurrentTapeTimeline } from '@/pages/tapes/store/selectors';
import { PrimaryAlert, WarningAlert } from '@/common/alerts';
import { DateTime } from 'luxon';

const Disclaimer = () => {
  const dispatch = useDispatch<Dispatch>();
  const now = DateTime.now().setZone('utc').toMillis();
  const { isChecked, sampleModalText } = useSelector((state: RootState) => state.sampleModel);
  const { end } = useSelector(selectCurrentTapeTimeline).submit;
  const bpm = useSelector(selectCurrentTapeBpm);

  return (
    <>
      {sampleModalText && (
        <Fragment>
          {now < end ? (
            <Flex direction={'column'}>
              <Divider my={5} />
              <PrimaryAlert countdown={end}>{useBreakpointValue({ base: '', lg: sampleModalText.primaryAlertText })}</PrimaryAlert>
              <Flex mt={5} px={2} direction={'column'}>
                <Text fontSize="xl" textColor={'blackAlpha.800'} fontWeight={'bold'}>
                  {sampleModalText.h1}
                </Text>
                <Flex mt={4} gap={2} alignItems={'center'}>
                  <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
                    {sampleModalText.req1}
                    <span className="text-green-600 font-semibold ml-1">{bpm}</span>
                  </Badge>
                  <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
                    {sampleModalText.req2}
                    <span className="text-orange-600 font-semibold ml-1">{'60-90 sec.'}</span>
                  </Badge>
                </Flex>
                <Checkbox mt={5} onChange={(e) => dispatch.sampleModel.setIsChecked(!isChecked)}>
                  <Text fontSize={'xs'}>{sampleModalText.checkboxText}</Text>
                </Checkbox>
                <Divider my={5} />
              </Flex>
            </Flex>
          ) : (
            <Fragment>
              <Divider my={5} />
              <Flex mb={5}>
                <WarningAlert>{sampleModalText.warningAlertText}</WarningAlert>
              </Flex>
            </Fragment>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Disclaimer;
