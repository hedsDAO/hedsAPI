import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Modals } from '@/modules/modals/store/modalModel';
import { IconBrandTwitter } from '@tabler/icons';
import { Fragment } from 'react';
import { LinkButton } from '@/common/buttons';
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

const VerifyTwitterButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const twitterHandle = useSelector(store.select.userModel.selectConnectedUserTwitterHandle);
  const { wallet } = useParams();
  const { address } = useAccount();
  return (
    <Fragment>
      {!twitterHandle?.length && wallet?.toLowerCase() === address?.toLowerCase() ? (
        <LinkButton
          onClick={() => {
            dispatch.modalModel.setModal(Modals.TWITTER_MODAL);
            dispatch.modalModel.setModalOpen(true);
          }}
          size="xs"
        >
          <IconBrandTwitter className="text-gray-700 mr-1" width={12} height={12} />
          Verify
        </LinkButton>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default VerifyTwitterButton;
