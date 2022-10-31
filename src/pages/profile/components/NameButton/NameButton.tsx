import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Flex, IconButton, Skeleton } from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Modals } from '@/modules/modals/store/modalModel';
import { Fragment } from 'react';
import { selectUserDisplayName } from '@/pages/user/store/selectors';

const NameButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const displayName = useSelector(selectUserDisplayName);
  return (
    <Fragment>
      {!displayName ? (
        <Flex h="full" alignItems={'center'} px={1}>
          <Skeleton rounded="md" h="fit-content" fadeDuration={2} isLoaded={!loading}>
            <IconButton
              onClick={() => {
                dispatch.modalModel.setModal(Modals.NAME_MODAL);
                dispatch.modalModel.setModalOpen(true);
              }}
              size="xs"
              bg={'transparent'}
              _hover={{ bg: 'gray.50' }}
              className=""
              aria-label="edit profile"
              icon={<PencilIcon className="text-gray-700" width={14} height={14} />}
            />
          </Skeleton>
        </Flex>
      ) : null}
    </Fragment>
  );
};

export default NameButton;
