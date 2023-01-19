import { Modals } from '@/modules/modals/store/modalModel';
import { Dispatch, RootState, store } from '@/store';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { IconBrandTwitter } from '@tabler/icons';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { VERIFY_BUTTON_TEXT, VERIFY_TWITTER_TEXT } from '../../models/constants';

const AuthWrapper = ({ children }: { children: any }) => {
  const dispatch = useDispatch<Dispatch>();
  const twitterHandle = useSelector(store.select.userModel.selectConnectedUserTwitterHandle);
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      dispatch.modalModel.setNextModal(Modals.SUBMIT_MODAL);
      dispatch.modalModel.setModal(Modals.CONNECT_MODAL);
      dispatch.modalModel.setModalOpen(true);
    }
  }, [isConnected]);

  return (
    <Fragment>
      {!twitterHandle ? (
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

export default AuthWrapper;
