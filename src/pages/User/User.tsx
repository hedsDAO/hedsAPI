import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';

export const User = () => {
  const dispatch = useDispatch<Dispatch>();
  const userData = useSelector((state: RootState) => state.userModel);
  const { wallet } = useParams<{ wallet: string }>();
  useEffect(() => {
    if (wallet) dispatch.userModel.getUserData(wallet);
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, []);
  console.log(userData);
  return (
    <>
      {userData && (
        <div className="bg-white">
          <div className="mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-6 lg:gap-y-10 xl:gap-x-10 lg:max-w-7xl">
              <div className="lg:col-span-2 lg:row-end-1">
                <img
                  src={userData.profilePicture}
                  alt={userData.displayName}
                  className="object-fill w-full h-full aspect-square rounded-lg object-center"
                />
              </div>
              <div className="mx-auto max-w-2xl sm:mt-10 lg:col-span-5 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none w-full px-1">
                <div className="flex flex-col">
                  <div className="sm:mt-2 mt-4">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                      {userData.displayName}
                    </h1>
                  </div>
                  <p className="text-gray-500 text-sm -mb-1 px-1">{userData.description || '...'}</p>
                </div>
                <div className="inline-flex items-center justify-start gap-x-1">
                  {userData?.twitterHandle && (
                    <a href={`https://www.twitter.com/${userData?.twitterHandle}`} target="_blank">
                      <span className="inline-flex items-center text-xs self-start mt-4 font-thin tracking-tight text-neutral-600 bg-blue-200 hover:bg-blue-200/75 px-2.5 py-0.5 rounded-lg transition-all ">
                        <i className="fa-brands fa-twitter mr-2 text-[0.65rem]"></i>@{userData.twitterHandle}
                      </span>
                    </a>
                  )}
                  {userData?.wallet && (
                    <span className="inline-flex items-center text-xs self-start mt-4 font-thin tracking-tight text-neutral-600 bg-teal-200 px-2.5 py-0.5 rounded-lg">
                      <i className="fa-solid fa-copy mr-2 text-[0.65rem]"></i>
                      {userData.wallet.slice(0, 4) +
                        '...' +
                        userData?.wallet.slice(userData?.wallet?.length - 4, userData?.wallet?.length)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
