import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Button } from '@chakra-ui/react';
import { Modals } from '@/modals/global/models/modalModel';
import { IconBrandTwitter } from '@tabler/icons';

const VerifyTwitterButton = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Button
      onClick={() => {
        dispatch.modalModel.setModal(Modals.TWITTER_MODAL);
        dispatch.modalModel.setModalOpen(true);
      }}
      size="xs"
      className=""
      aria-label="edit profile"
      leftIcon={<IconBrandTwitter className="text-gray-700" width={16} height={16} />}
    >
      Verify
    </Button>
  );
};

export default VerifyTwitterButton;
