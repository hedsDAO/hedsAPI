import React from 'react';
import { TapeIcons } from './TapeIcons';
import { UserState } from 'src/models/userModel';
export default ({ user }: { user: UserState }): JSX.Element => <TapeIcons user={user} />;
