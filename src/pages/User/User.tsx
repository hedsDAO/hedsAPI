import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';

export const User = () => {
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const userData = useSelector((state: RootState) => state.userModel);
  const { wallet } = useParams<{ wallet: string }>();
  useEffect(() => {
    if (wallet) dispatch.userModel.getUserData(wallet);
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, []);

  const handleCopy = () => {
    setIsShowing(true);
    const el = document.createElement('textarea');
    el.value = wallet;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    const timer = setTimeout(() => {
      setIsShowing(false);
    }, 1000);
    return () => clearTimeout(timer);
  };
  return (
    <>
      {userData?.wallet ? (
        <div className="max-w-7xl flex flex-col items-start mx-auto my-10 xl:px-3 px-4">
          <div className="flex">
            <div className="min-w-full aspect-square sm:w-[25%]">
              <img
                src={userData.profilePicture}
                alt={userData.displayName}
                className="object-cover w-full h-full lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem] aspect-square rounded-lg object-center"
              />
              <div className="sm:mt-6 mt-4">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{userData.displayName}</h1>
              </div>
              <p className="text-gray-500 text-sm mb-1 px-1">{userData.description || '...'}</p>
              <div className="inline-flex items-center justify-start gap-x-1">
                {userData?.twitterHandle && (
                  <a href={`https://www.twitter.com/${userData?.twitterHandle}`} target="_blank">
                    <span className="inline-flex items-center text-xs self-start mt-4 tracking-tight text-neutral-600 bg-blue-200 hover:bg-blue-200/75 px-2.5 py-0.5 rounded-lg transition-all ">
                      <i className="fa-brands fa-twitter mr-2 text-[0.65rem]"></i>@{userData.twitterHandle}
                    </span>
                  </a>
                )}
                {userData?.wallet && (
                  <div className="flex">
                    <button
                      onClick={() => handleCopy()}
                      className="inline-flex items-center text-xs self-start mt-4 tracking-tight text-neutral-600 bg-teal-200 hover:bg-teal-100 px-2.5 py-0.5 rounded-lg"
                    >
                      <i className="fa-solid fa-copy mr-2 text-[0.65rem]"></i>
                      {userData.wallet.slice(0, 4) + '...' + userData?.wallet.slice(userData?.wallet?.length - 4, userData?.wallet?.length)}
                    </button>
                    <Transition
                      show={isShowing}
                      enter="transition-opacity duration-75"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      className="text-[0.65rem] font-thin mt-auto px-2.5 py-0.5 text-neutral-300 bg-neutral-800 mx-1 rounded-lg"
                      as="div"
                    >
                      copied
                    </Transition>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[100%] sm:w-[75%]"></div>
          </div>
        </div>
      ) : (
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
    </>
  );
};
