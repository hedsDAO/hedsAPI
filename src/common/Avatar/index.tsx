import React from 'react';
import { ProfileState } from 'src/models/profileModal';
import { Avatar } from './Avatar';
export default ({ profileData }: { profileData: ProfileState }): JSX.Element => <Avatar profileData={profileData} />;
