import React from 'react';
import { User } from '@/models/common';
import { parseTapeIcons } from '@/utils';

export const TapeIcons = ({ user }: { user: User }) => {
  return (
    <>
      <span className="absolute bottom-16 right-4 lg:bottom-[3.75rem] lg:right-4 flex rounded-full lg:-space-x-1">
        {parseTapeIcons(user).map((icon, i) => {
          return <img key={icon + i} className="h-6 w-6 lg:h-7 lg:w-7 ring-[1.25px] ring-neutral-100 rounded-full drop-shadow-lg" src={icon} />;
        })}
      </span>
    </>
  );
};
