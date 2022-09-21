import React from 'react';
import { User } from '@/models/common';
import { Avatar } from './Avatar';
export default ({ profileData }: { profileData: User }): JSX.Element => <Avatar profileData={profileData} />;
