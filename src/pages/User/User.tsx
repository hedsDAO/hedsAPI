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
  return (
    <>
      {userData && (
        <div className="bg-white">
          <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
              <div className="lg:col-span-2 lg:row-end-1">
                <img
                  src={userData.profilePicture}
                  alt={userData.displayName}
                  className="object-cover w-full h-full aspect-square rounded-lg object-center"
                />
              </div>
              <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-5 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none w-full px-1">
                <div className="flex flex-col-reverse">
                  <div className="mt-4">
                    <h1 className="text-2xl font-thin tracking-tight text-gray-900 sm:text-3xl">
                      {userData.displayName}
                    </h1>
                  </div>
                </div>
                <p className="mt-2 text-gray-500">{userData.description || '...'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
