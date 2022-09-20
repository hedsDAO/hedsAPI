import React from 'react';
import { ReactChildrenAsProps } from '@/models/common';

export const Container = ({ children }: ReactChildrenAsProps) => {
  return <div className="max-w-7xl my-10 mx-auto px-3 flex flex-row gap-8">{children}</div>;
};

/*

: (
        <div className="max-w-7xl flex flex-col items-start mx-auto my-10 xl:px-3 px-4">
          <div className="flex">
            <div className="min-w-full aspect-square sm:w-[25%]">
              <img
                src={
                  'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/users%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc'
                }
                className="object-cover w-full h-full lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem] aspect-square rounded-lg object-center"
              />
              <div className="sm:mt-6 mt-4">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{'Not Found'}</h1>
              </div>
              <p className="text-gray-500 text-sm mb-1 px-1">{'...'}</p>
              <div className="inline-flex items-center justify-start gap-x-1">
                <span>
                  <span className="inline-flex items-center text-xs self-start mt-4 font-thin tracking-tight text-neutral-600 bg-blue-200 hover:bg-blue-200/75 px-2.5 py-0.5 rounded-lg transition-all ">
                    <i className="fa-brands fa-twitter mr-2 text-[0.65rem]"></i>@{'...'}
                  </span>
                </span>
                <div className="flex">
                  <button className="inline-flex items-center text-xs self-start mt-4 font-thin tracking-tight text-neutral-600 bg-teal-200 hover:bg-teal-100 px-2.5 py-0.5 rounded-lg">
                    <i className="fa-solid fa-copy mr-2 text-[0.65rem]"></i>
                    {'0x000...0000'}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[100%] sm:w-[75%]"></div>
          </div>
        </div>
      )}
      
*/
