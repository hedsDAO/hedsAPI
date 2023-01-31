import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { formatTwitterUrl } from '@/utils';
import { Button, Skeleton, Text, Link } from '@chakra-ui/react';
import { Modals } from '@/modules/modals/store/modalModel';

const TwitterButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const twitterHandle = useSelector(store.select.userModel.selectCurrentUserTwitterHandle);
  const isOwnPage = useSelector(store.select.userModel.selectIsOwnPage);
  const isLoading = useSelector((state: RootState) => state.loading.models.userModel);
  return (
    // <Skeleton isLoaded={!isLoading} minW="5ch" rounded="md">
    <>
      {!twitterHandle && isOwnPage ? (
        <Button
          onClick={() => {
            dispatch.modalModel.setModal(Modals.TWITTER_MODAL);
            dispatch.modalModel.setModalOpen(true);
          }}
          leftIcon={<i className="fa-brands fa-twitter text-xs"></i>}
          bg="gray.100"
          border={'1px'}
          borderColor="gray.800"
          rounded="sm"
          fontWeight={'light'}
          size="xs"
          width={'24ch'}
          fontFamily={'"Space Mono", monospace'}
        >
          <Text>verify</Text>
        </Button>
      ) : (
        <Button
          as={Link}
          isExternal
          href={formatTwitterUrl(twitterHandle)}
          leftIcon={<i className="fa-brands fa-twitter text-xs"></i>}
          bg="gray.100"
          border={'1px'}
          borderColor="gray.800"
          rounded="sm"
          fontWeight={'light'}
          size="xs"
          width={'24ch'}
          fontFamily={'"Space Mono", monospace'}
        >
          <Text>@{twitterHandle}</Text>
        </Button>
      )}
    </>
    // </Skeleton>
  );
};

export default TwitterButton;
