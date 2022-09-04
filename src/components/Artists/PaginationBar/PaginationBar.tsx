import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import React from 'react';

export const PaginationBar = ({ total, perPage }: { total: number; perPage: number }) => {
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 max-w-7xl mx-auto">
      <div className="-mt-px flex w-0 flex-1">
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array((Math.ceil(total / 10) * 10) / perPage)].map((index, i) => {
          return (
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {i + 1}
            </a>
          );
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
};
