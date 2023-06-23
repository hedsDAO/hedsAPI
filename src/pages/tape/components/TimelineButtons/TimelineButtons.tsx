import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { Modals } from '@/modals/models/modalModel';

// Utils
import { DateTime } from 'luxon';
import { Dispatch, store } from '@/store';

// Styles
import * as styles from '@/pages/tape/components/TimelineButtons/styles';

export const TimelineButtons = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const timeline = useSelector(store.select.tapeModel.selectTimeline);
  const cycle = useSelector(store.select.tapeModel.selectCurrentCycle);

  const formatTime = (time: number) => {
    if (time !== 0) {
      const dateObj = DateTime.fromMillis(time);
      const date = dateObj.toLocaleString({
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      });
      return date;
    }
  };

  return (
    <Stack {...styles.$timelineButtonsStackStyles}>
      {timeline?.submit && (
        <>
          <HStack {...styles.$timelineHeaderStackStyles}>
            <Text color="#9293FF" fontFamily="sans-serif">
              Submit
            </Text>
            {cycle === 'submit' ? (
              <i className="fa-solid fa-lock-keyhole-open" style={{ color: '#05FF00' }} />
            ) : (
              <i className="fa-solid fa-lock-keyhole" style={{ color: '#F02A2A' }} />
            )}
            <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.submit?.start)}</Text>
          </HStack>
          <Button {...styles.$buttonStyles} leftIcon={<i className="fa-sharp fa-solid fa-circle-check"></i>} onClick={() => dispatch.modalModel.setModal(Modals.SUBMIT)} isDisabled={!(cycle === 'submit')}>
            UPLOAD SUBMISSION
          </Button>
        </>
      )}
      {timeline?.vote && (
        <>
          <HStack {...styles.$timelineHeaderStackStyles}>
            <Text color="#9293FF" fontFamily="sans-serif">
              Vote
            </Text>
            {cycle === 'vote' ? (
              <i className="fa-solid fa-lock-keyhole-open" style={{ color: '#05FF00' }} />
            ) : (
              <i className="fa-solid fa-lock-keyhole" style={{ color: '#F02A2A' }} />
            )}
            <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.vote?.start)}</Text>
          </HStack>
          <Button {...styles.$buttonStyles} leftIcon={<i className="fa-sharp fa-solid fa-circle-check"></i>} onClick={() => navigate(`/vote/${id}`)}>
            {cycle === 'vote' ? 'VOTE NOW' : 'RESULTS'}
          </Button>
        </>
      )}
      <HStack {...styles.$timelineHeaderStackStyles}>
        <Text color="#9293FF" fontFamily="sans-serif">
          Mint
        </Text>
        <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.mint?.start)}</Text>
      </HStack>
      <Button
        {...styles.$buttonStyles}
        leftIcon={<i className="fa-solid fa-bell" />}
        isDisabled={!(cycle === 'mint')}
        onClick={() => dispatch.modalModel.setModal(Modals.MINT)}
      >
        {cycle === 'submit' || cycle === 'vote' ? 'UPCOMING' : cycle === 'mint' ? 'MINT' : 'CLOSED'}
      </Button>
    </Stack>
  );
};
