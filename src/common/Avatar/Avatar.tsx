import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileState } from 'src/models/profileModal';

export const Avatar = ({ profileData }: { profileData: ProfileState }) => {
  return (
    <Link to="/profile">
      <img className="inline-block h-10 w-10 rounded-full" src={profileData?.profilePicture} alt="" />
    </Link>
  );
};
