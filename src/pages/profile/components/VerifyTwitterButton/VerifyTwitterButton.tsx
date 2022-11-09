import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@/store';
import { Button, Flex } from '@chakra-ui/react';
import { Modals } from '@/modules/modals/store/modalModel';
import { IconBrandTwitter } from '@tabler/icons';
import { Fragment } from 'react';
import { selectProfileTwitterHandle } from '../../store/selectors';

const VerifyTwitterButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const twitterHandle = useSelector(selectProfileTwitterHandle);
  return (
    <Fragment>
      {!twitterHandle?.length && (
        <Flex alignItems={'center'} data-testid="verify-twitter-container">
          <Button
            onClick={() => {
              dispatch.modalModel.setModal(Modals.TWITTER_MODAL);
              dispatch.modalModel.setModalOpen(true);
            }}
            size="xs"
            className="mx-0"
            aria-label="edit profile"
            leftIcon={<IconBrandTwitter className="text-gray-700" width={16} height={16} />}
          >
            Verify
          </Button>
        </Flex>
      )}
    </Fragment>
  );
};

export default VerifyTwitterButton;
