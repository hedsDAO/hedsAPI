import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { formatWallet } from '@/utils';
import { Heading, Skeleton } from '@chakra-ui/react';
import { selectUserDisplayName, selectUserWallet } from '@/pages/user/store/selectors';

const DisplayName = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const displayName = useSelector(selectUserDisplayName);
  const wallet = useSelector(selectUserWallet);
  return (
    <Fragment>
      {wallet && (
        <Skeleton rounded="md" h="fit-content" fadeDuration={2} isLoaded={!loading}>
          <Heading size={'lg'} data-testid="user-display-name" px={1} pt={2}>
            {displayName?.length ? displayName : formatWallet(wallet)}
          </Heading>
        </Skeleton>
      )}
    </Fragment>
  );
};

export default DisplayName;
