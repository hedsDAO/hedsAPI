import React from 'react';
import { Link } from 'react-router-dom';
import { UserState } from 'src/models/userModel';

export const Avatar = ({ userData }: { userData: UserState }) => {
  return (
    <Link to="/profile">
      <img
        className="inline-block h-10 w-10 rounded-full"
        src={userData?.profilePicture}
        alt=""
      />
    </Link>
  );
};
