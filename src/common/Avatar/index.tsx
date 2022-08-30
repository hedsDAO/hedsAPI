import React from 'react';
import { UserState } from 'src/models/userModel';
import { Avatar } from './Avatar';
export default ({ userData }: { userData: UserState }): JSX.Element => <Avatar userData={userData} />;
