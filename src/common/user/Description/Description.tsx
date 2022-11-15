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
      <Skeleton rounded="md" height="fit-content" maxW='64' fadeDuration={2} isLoaded={!loading} px={1}>
        <Text className="-mt-2" data-testid="user-description" maxW='xs' fontSize={'sm'} color={'gray.600'}>
          {description || '...'}
        </Text>
      </Skeleton>
    </Fragment>
  );
};

export default UserDescription;
