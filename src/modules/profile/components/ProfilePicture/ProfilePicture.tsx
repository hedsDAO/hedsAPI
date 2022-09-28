import { User } from '@/models/common';
import { IconButton, Skeleton } from '@chakra-ui/react';
import DEFAULT_PROFILE_PICTURE from '/public/default.png';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Modals } from '@/modals/modalModel';

const ProfilePicture = ({ loading, profileData }: { loading: boolean; profileData: User }) => {
  const dispatch = useDispatch<Dispatch>();
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
        src={profileData.profilePicture ? profileData.profilePicture : DEFAULT_PROFILE_PICTURE}
        alt={profileData.displayName}
        className="object-cover lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem] aspect-square rounded-lg object-center"
        data-testid="user-profile-picture"
      />
      <IconButton
        onClick={() => {
          dispatch.modalModel.setModal(Modals.PROFILE_MODAL);
          dispatch.modalModel.setModalOpen(true);
        }}
        size="xs"
        className="relative bottom-9 left-2"
        aria-label="edit profile"
        icon={<Cog6ToothIcon className="text-gray-700" width={20} height={20} />}
      />
    </Skeleton>
  );
};

export default ProfilePicture;
