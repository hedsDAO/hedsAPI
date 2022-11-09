import { Fragment, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpaceTapeId } from '@/pages/tapes/store/selectors';
import { Dispatch, RootState } from '@/store';
import { Flex } from '@chakra-ui/react';



import { SubmitSteps } from '../../models/submitModel';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import VerifyTwitter from '../VerifyTwitter/VerifyTwitter';

const UserAuthWrapper = ({ children }: { children: any }) => {
  const dispatch = useDispatch<Dispatch>();
  const profileData = useSelector((state: RootState) => state.profileModel);
  const [space, tape, id] = useSelector(selectSpaceTapeId);
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (address) dispatch.profileModel.getProfileData(address.toLowerCase());
  }, [address]);

  useEffect(() => {
    if (profileData?.submissions?.[space]?.[tape]?.[id]) dispatch.submitModel.setCurrentStep(SubmitSteps.PREVIOUS_SUBMISSION);
  }, [profileData]);

  return (
    <Fragment>
      {!isConnected ? (
        <Flex alignItems={'center'} px={2} direction={'column'}>
          <ConnectWallet />
        </Flex>
      ) : !profileData?.twitterHandle ? (
        <Flex alignItems={'center'} px={2} direction={'column'}>
          <VerifyTwitter />
        </Flex>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </Fragment>
  );
};

export default UserAuthWrapper;
