import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export const Warning = () => {
  return (
    <div className="static top-20 z-20 border-l-4 border-yellow-400 bg-yellow-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Network Changed
            <a href="#" className="font-medium text-yellow-700 underline hover:text-yellow-600">
              Switch back to mainnet to continue
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
