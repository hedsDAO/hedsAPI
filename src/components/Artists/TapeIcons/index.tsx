import React from 'react';
import { TapeIcons } from './TapeIcons';
import { User } from 'src/models/common';
export default ({ user }: { user: User }): JSX.Element => <TapeIcons user={user} />;
