import { Skeleton } from '@chakra-ui/react';
import { User } from '@/models/common';
import DEFAULT_PROFILE_PICTURE from '/public/default.png';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfilePicture = () => {
  const loading = useSelector((state: RootState) => state.loadinguserModel);
  const userData = useSelector((state: RootState) => state.userModel);
  return (
    <Skeleton
      minHeight={['100%', '16rem']}
      maxHeight={['100%', '16rem']}
      minWidth={['100%', '16rem']}
      maxWidth={['100%', '16rem']}
      borderRadius={'0.5rem'}
      fadeDuration={1}
      speed={2}
      isLoaded={!loading}
    >
      <img
        src={userData?.profilePicture ? userData.profilePicture : DEFAULT_PROFILE_PICTURE}
        alt={userData?.displayName}
        style={{ border: '1px' }}
        className="bs-preset-1 object-cover lg:min-h-[16rem] lg:max-h-[16rem] lg:min-w-[16rem] lg:max-w-[16rem] aspect-square rounded-lg object-center"
        data-testid="user-profile-picture"
      />
    </Skeleton>
  );
};

export default ProfilePicture;
