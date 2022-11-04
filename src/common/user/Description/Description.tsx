import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Skeleton, Text } from '@chakra-ui/react';
import { selectUserDescription } from '@/pages/user/store/selectors';

const UserDescription = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const description = useSelector(selectUserDescription);

  return (
    <Fragment>
      <Skeleton rounded="md" height="fit-content" fadeDuration={2} isLoaded={!loading}>
        <Text pb={{ base: 6, lg: 2 }} className="-mt-2" data-testid="user-description" fontSize={'sm'} color={'gray.600'}>
          {description || '...'}
        </Text>
      </Skeleton>
    </Fragment>
  );
};

export default UserDescription;
