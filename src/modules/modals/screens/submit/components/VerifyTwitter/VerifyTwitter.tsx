import { Modals } from '@/modules/modals/store/modalModel';
import { Dispatch } from '@/store';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { IconBrandTwitter } from '@tabler/icons';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

const VerifyTwitter = () => {
  const dispatch = useDispatch<Dispatch>();

  return (
    <Fragment>
      <Text mb={4} fontSize="lg" fontWeight={'semibold'} textColor={'blackAlpha.800'}>
        Verify with Twitter
      </Text>
      <Flex alignItems={'center'} data-testid="verify-twitter-container">
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
          Verify
        </Button>
      </Flex>
      <Divider my={5} />
    </Fragment>
  );
};

export default VerifyTwitter;
