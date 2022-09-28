import { User } from '@/models/common';
import { Link } from 'react-router-dom';

export const Avatar = ({ profileData }: { profileData: User }) => {
  return (
    <Link to="/profile">
      <img className="inline-block h-10 w-10 rounded-full" src={profileData?.profilePicture} alt="" />
    </Link>
  );
};
