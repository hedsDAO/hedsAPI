import React from 'react';
import { UserState } from '../../../../src/models/userModel';
import { parseTapeIcons } from '../../../../src/utils/parseTapeIcons';

export const TapeIcons = ({ user }: { user: UserState }) => {
  return (
    <>
      <span className="absolute bottom-16 right-4 lg:bottom-18 lg:right-4 flex rounded-full lg:-space-x-1">
        {parseTapeIcons(user).map((icon, i) => {
          return (
            <img
              key={icon + i}
              className="h-6 w-6 lg:h-8 lg:w-8 ring-[1.25px] ring-neutral-100 rounded-full drop-shadow-md"
              src={icon}
            />
          );
        })}
      </span>
    </>
  );
};
