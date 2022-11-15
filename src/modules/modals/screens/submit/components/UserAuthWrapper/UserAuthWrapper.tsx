import { Fragment, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { selectSpaceTapeId } from '@/pages/tapes/store/selectors';
import { SubmitSteps } from '@modals/screens/submit/models/common';
import { ConnectButton } from '@/common/buttons';
import { IconBrandTwitter } from '@tabler/icons';
import { Modals } from '@/modules/modals/store/modalModel';
import { CONNECT_WALLET_TEXT, VERIFY_TWITTER_TEXT, VERIFY_BUTTON_TEXT } from '../../models/constants';

const UserAuthWrapper = ({ children }: { children: any }) => {
  const dispatch = useDispatch<Dispatch>();
  const profileData = useSelector((state: RootState) => state.profileModel);
  const [space, tape, id] = useSelector(selectSpaceTapeId);
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (address) dispatch.profileModel.getProfileData(address.toLowerCase());
  }, [address]);

  useEffect(() => {
    if (profileData?.submissions?.[space]?.[tape]?.[id]) {
      dispatch.submitModel.setHasPrevSubmitted(true);
      dispatch.submitModel.setCurrentStep(SubmitSteps.PREVIOUS_SUBMISSION);
    } else dispatch.submitModel.setCurrentStep(SubmitSteps.REQS_AND_DISCLAIMER);
  }, [profileData]);

  return (
    <Fragment>
      {!isConnected ? (
        <Flex alignItems={'center'} px={2} direction={'column'}>
          <Text mb={4} fontSize="lg" fontWeight={'semibold'}>
            {CONNECT_WALLET_TEXT}
          </Text>
          <ConnectButton nextModal={Modals.SUBMIT_MODAL} />
          <Divider mt={5} />
        </Flex>
      ) : !profileData?.twitterHandle ? (
        <Flex alignItems={'center'} px={2} direction={'column'}>
          <Text mb={4} fontSize="lg" fontWeight={'semibold'}>
            {VERIFY_TWITTER_TEXT}
          </Text>
          <Flex alignItems={'center'} data-testid="verify-twitter-container" mb={2}>
            <Button
              onClick={() => {
                dispatch.modalModel.setNextModal(Modals.SUBMIT_MODAL);
                dispatch.modalModel.setModal(Modals.TWITTER_MODAL);
                dispatch.modalModel.setModalOpen(true);
              }}
              size="sm"
              className="mx-0 border"
              bg="blue.100"
              borderColor={'blue.200'}
              aria-label="edit profile"
              leftIcon={<IconBrandTwitter className="text-gray-700" width={16} height={16} />}
            >
              {VERIFY_BUTTON_TEXT}
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </Fragment>
  );
};

export default UserAuthWrapper;
