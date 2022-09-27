import React from 'react';
import { User } from '@/models/common';
import { formatTime } from '@/utils';

export const UserSubmissions = ({ userData }: { userData: User }) => {
  return (
    <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200">
      {userData.submissions &&
        Object.entries(userData.submissions.heds.hedstape).map(([id, submission], i) => (
          <li className="text-xs text-gray-600" key={i}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="flex items-center px-2 py-3 gap-x-2">
                <span className="text-xs font-thin">HT{id}</span>
                <div className="min-w-0 flex-1 sm:flex">{submission.track}</div>
                <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                  <span className="mr-2">{formatTime(submission.duration)}</span>
                  <i className="fa-solid fa-play"></i>
                </div>
              </div>
            </a>
          </li>
        ))}
    </ul>
  );
};
