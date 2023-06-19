import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { formatWallet } from '@/utils';
import { Avatar, Box, Button, Flex, Radio, Stack, Text } from '@chakra-ui/react';
import { CountdownClock } from '@common/utility/CountdownClock';
import { SubmitModelSteps } from '@/modals/screens/submit/models/common';
import * as constants from '@/modals/screens/submit/models/constants';
import * as styles from '@/modals/screens/submit/components/TermsScreen/styles';

const RedText: React.FC<{ children: React.ReactNode }> = ({ children }) => <Box {...styles.$redTextStyles}>{children}</Box>;

export const TermScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);
  const timeline = useSelector(store.select.tapeModel.selectTimeline);
  const hasAcceptedTerms = useSelector(store.select.submitModel.selectHasAcceptedTerms);
  const bodyText = constants.DISCLAIMER_TEXT_BODY(tape?.bpm).map((part, index) => (index % 2 !== 0 ? <RedText key={index}>{part}</RedText> : part));
  return (
    <>
      <Flex {...styles.$curatorInfoFlexProps}>
        <Avatar {...styles.$curatorAvatarStyles} src={tape.sampleArtists[0].profile_picture} />
        <Stack>
          <Text {...styles.$curatorNameTextStyles}>{tape.sampleArtists?.[0]?.display_name}</Text>
          <Text {...styles.$curatorWalletTextStyles}>{formatWallet(tape.sampleArtists?.[0]?.wallet)}</Text>
        </Stack>
      </Flex>
      <CountdownClock milliseconds={1687287078000 || timeline?.submit?.end} header={constants.COUNTDOWN_HEADER_TEXT} />
      <Stack {...styles.$disclaimerTextStackProps}>
        <Text {...styles.$headerTextStyles}>{constants.DISCLAIMER_TEXT_TITLE}</Text>
        <Text {...styles.$textProps}>{bodyText}</Text>
      </Stack>
      <Stack {...styles.$buttonsAndDisclaimerStackStyles}>
        <Flex {...styles.$radioFlexStyles}>
          <Radio isChecked={hasAcceptedTerms} onClick={() => dispatch.submitModel.setHasAcceptedTerms(!hasAcceptedTerms)} {...styles.$radioStyles} />
          <Text {...styles.$radioTextStyles}>{constants.TERMS_BACK_RADIO_TEXT}</Text>
        </Flex>
        <Button {...styles.$continueButtonStyles} onClick={() => dispatch.submitModel.setCurrentStep(SubmitModelSteps.UPLOAD)} isDisabled={!hasAcceptedTerms}>
          {constants.TERMS_CONTINUE_BUTTON_TEXT}
        </Button>
      </Stack>
    </>
  );
};
