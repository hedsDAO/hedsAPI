import { Skeleton } from '@chakra-ui/react';
import DEFAULT_PROFILE_PICTURE from '/public/default.png';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';

const ProfilePicture = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const profilePicture = useSelector(store.select.userModel.selectConnectedUserProfilePicture);
  const displayName = useSelector(store.select.userModel.selectConnectedUserDisplayName);
  return (
    <>
      <Skeleton
        minHeight={['100%', '16rem']}
        maxHeight={['100%', '16rem']}
        minWidth={['100%', '16rem']}
        maxWidth={['100%', '16rem']}
        borderRadius={'0.5rem'}
        speed={4}
        isLoaded={!loading}
      >
        <img
          src={!loading && profilePicture ? profilePicture : DEFAULT_PROFILE_PICTURE}
          alt={displayName}
          style={{ border: '1px' }}
          className="bs-preset-1 object-cover lg:min-h-[16rem] lg:max-h-[16rem] lg:min-w-[16rem] lg:max-w-[16rem] aspect-square rounded-lg object-center"
          data-testid="user-profile-picture"
        />
      </Skeleton>
    </>
  );
};

export default ProfilePicture;
