import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@/store';
import { Modals } from '@/modules/modals/store/modalModel';
import { IconBrandTwitter } from '@tabler/icons';
import { Fragment } from 'react';
import { selectProfileTwitterHandle } from '../../store/selectors';
import { LinkButton } from '@/common/buttons';

const VerifyTwitterButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const twitterHandle = useSelector(selectProfileTwitterHandle);
  return (
    <Fragment>
      {!twitterHandle?.length && (
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
      )}
    </Fragment>
  );
};

export default VerifyTwitterButton;
