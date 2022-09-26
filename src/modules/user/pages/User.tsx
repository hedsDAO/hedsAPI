import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from '@/store';
import { Skeleton } from '@chakra-ui/react';
import { formatTime } from '@utils/formatTime';
import { formatWallet } from '@utils/formatWallet';
import DEFAULT_PROFILE_PICTURE from '/public/default.png';

export const User = () => {
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const isUserDataLoading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const submissions = useSelector((state: RootState) => state.userModel.submissions?.heds?.hedstape);
  const { wallet } = useParams<{ wallet: string }>();
  useEffect(() => {
    if (wallet) dispatch.userModel.getUserData(wallet);
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, []);

  console.log(submissions);

  const handleCopy = () => {
    setIsCopied(true);
    const el = document.createElement('textarea');
    el.value = wallet;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  };
  return (
    <div className="max-w-7xl mx-auto flex sm:flex-row flex-col gap-5">
      <div className="aspect-square flex flex-col">
        <Skeleton
          className="w-full h-full lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem]"
          borderRadius={'0.5rem'}
          fadeDuration={1}
          speed={2}
          isLoaded={!isUserDataLoading}
        >
          <img
            src={userData.profilePicture || DEFAULT_PROFILE_PICTURE}
            alt={userData.displayName}
            className="object-cover w-full h-full lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem] aspect-square rounded-lg object-center"
            data-testid="user-profile-picture"
          />
        </Skeleton>
        <div className="sm:mt-6 mt-4">
          <h1 data-testid="user-display-name" className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {userData?.displayName}
          </h1>
        </div>
        <p data-testid="user-description" className="text-gray-500 text-sm mb-1 px-1">
          {userData?.description || '...'}
        </p>
        {userData?.twitterHandle && (
          <a data-testid="user-twitter-link" href={`https://www.twitter.com/${userData?.twitterHandle}`} target="_blank" rel="noreferrer">
            <span
              data-testid="user-twitter-text"
              className="inline-flex items-center text-xs self-start mt-4 tracking-tight text-neutral-600 px-2.5 py-0.5 rounded-lg transition-all "
            >
              <i className="fa-brands fa-twitter mr-2 text-[0.75rem]"></i>@{userData.twitterHandle}
            </span>
          </a>
        )}
        <div data-testid="user-copy-container" className="inline-flex">
          <button
            data-testid="user-wallet"
            onClick={() => handleCopy()}
            className="inline-flex items-center text-xs self-start mt-4 tracking-tight text-neutral-600  px-2.5 py-0.5 rounded-lg"
          >
            <i className="fa-solid fa-copy mr-2 text-[0.75rem]"></i>
            {userData?.wallet && formatWallet(userData.wallet)}
          </button>
          <Transition
            show={isCopied}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="text-[0.75rem] font-bold mt-auto px-2.5 py-0.5 text-white bg-teal-300 w-24 rounded-lg"
            as="div"
          >
            copied
          </Transition>
        </div>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl my-2">Submissions</h1>
        <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200">
          {submissions &&
            Object.entries(submissions).map(([id, submission], i) => (
              <li className="text-xs text-gray-600" key={i}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-3 sm:px-6 gap-x-2">
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
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl my-2">Featured On</h1>
      </div>
    </div>
  );
};
