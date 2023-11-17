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
import { useRef } from 'react';

export const TimelineButtons = () => {
  const { id } = useParams<{ id: string }>();
  const voteRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const timeline = useSelector(store.select.tapeModel.selectTimeline);
  const proposalId = useSelector(store.select.tapeModel.selectTapeProposalId);
  const cycle = useSelector(store.select.tapeModel.selectCurrentCycle);
  const tapeId = useSelector(store.select.tapeModel.selectCurrentTape).id;
  const now = DateTime.now().toMillis();

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
          <Button
            {...styles.$buttonStyles}
            leftIcon={<i className="fa-sharp fa-solid fa-circle-check"></i>}
            onClick={() => dispatch.modalModel.setModal(Modals.SUBMIT)}
            isDisabled={!(cycle === 'submit')}
          >
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
            {now >= timeline?.vote?.end || now <= timeline?.vote?.start ? (
              <i className="fa-solid fa-lock-keyhole" style={{ color: '#F02A2A' }} />
            ) : (
              <i className="fa-solid fa-lock-keyhole-open" style={{ color: '#05FF00' }} />
            )}
            <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.vote?.start)}</Text>
          </HStack>
          <a ref={voteRef} style={{ display: 'none' }} target="_blank" rel="noopener noreferrer" href={`https://heds.vote/heds/${proposalId}`} />
          <Button
            onClick={() => {
              if (now >= timeline?.vote?.start && voteRef?.current && proposalId?.length) {
                voteRef.current?.click();
              }
            }}
            {...styles.$buttonStyles}
            isDisabled={now <= timeline?.vote?.start || proposalId?.length === 0}
            leftIcon={<i className="fa-sharp fa-solid fa-circle-check"></i>}
          >
            {now <= timeline?.vote?.end ? 'VOTE NOW' : 'RESULTS'}
          </Button>
        </>
      )}
      <HStack {...styles.$timelineHeaderStackStyles}>
        <Text color="#9293FF" fontFamily="sans-serif">
          Mint
        </Text>
        <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.mint?.start)}</Text>
      </HStack>
      {tapeId === 19 ? (
        <Button
          {...styles.$buttonStyles}
          leftIcon={<i className="fa-solid fa-bell" />}
          isDisabled={!(cycle === 'mint')}
          target="_blank"
          as={'a'}
          href={'https://www.sound.xyz/heds/hedstape-17-feat-thys'}
        >
          {now < timeline?.mint?.start ? 'UPCOMING' : now < timeline?.mint?.end ? 'MINT NOW' : 'CLOSED'}
        </Button>
      ) : (
        <Button
          {...styles.$buttonStyles}
          leftIcon={<i className="fa-solid fa-bell" />}
          isDisabled={!(cycle === 'mint')}
          onClick={() => dispatch.modalModel.setModal(Modals.MINT)}
        >
          {now < timeline?.mint?.start ? 'UPCOMING' : now < timeline?.mint?.end ? 'MINT NOW' : 'CLOSED'}
        </Button>
      )}
    </Stack>
  );
};
