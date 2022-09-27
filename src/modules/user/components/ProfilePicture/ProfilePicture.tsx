import React from 'react';
import { User } from '@/models/common';
import { Skeleton } from '@chakra-ui/react';
import DEFAULT_PROFILE_PICTURE from '/public/default.png';

const ProfilePicture = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Skeleton
      minHeight={['100%', '18rem']}
      maxHeight={['100%', '18rem']}
      minWidth={['100%', '18rem']}
      maxWidth={['100%', '18rem']}
      borderRadius={'0.5rem'}
      fadeDuration={1}
      speed={2}
      isLoaded={!loading}
    >
      <img
        src={userData.profilePicture ? userData.profilePicture : DEFAULT_PROFILE_PICTURE}
        alt={userData.displayName}
        className="object-cover lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem] aspect-square rounded-lg object-center"
        data-testid="user-profile-picture"
      />
    </Skeleton>
  );
};

export default ProfilePicture;
