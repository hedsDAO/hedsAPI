import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from '@/store';
import Container from '@/common/Container';
import { Skeleton } from '@chakra-ui/react';
import { DEFAULT_PROFILE_PICTURE } from '@/common/constants/User';
import { convertSecondsToMinutes, formatWallet } from '@/common/constants/helpers';

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
    <Container>
      <div className="aspect-square sm:w-[25%]">
        <img
          src={userData.profilePicture || DEFAULT_PROFILE_PICTURE}
          alt={userData.displayName}
          className="object-cover w-full h-full lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem] aspect-square rounded-lg object-center"
        />
        <div className="sm:mt-6 mt-4">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{userData.displayName}</h1>
        </div>
        <p className="text-gray-500 text-sm mb-1 px-1">{userData.description || '...'}</p>
        <Skeleton fadeDuration={2} isLoaded={!isUserDataLoading}>
          <a href={`https://www.twitter.com/${userData?.twitterHandle}`} target="_blank" rel="noreferrer">
            <span className="inline-flex items-center text-xs self-start mt-4 tracking-tight text-neutral-600 px-2.5 py-0.5 rounded-lg transition-all ">
              <i className="fa-brands fa-twitter mr-2 text-[0.75rem]"></i>@{userData.twitterHandle}
            </span>
          </a>
        </Skeleton>
        <Skeleton fadeDuration={3} isLoaded={!isUserDataLoading}>
          <div className="inline-flex">
            <button
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
        </Skeleton>
      </div>
      <div className="sm:w-[75%]">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl my-2">Submissions</h1>
        <ul role="list" className="divide-y divide-gray-200">
          {submissions &&
            Object.entries(submissions).map(([id, submission], i) => (
              <li className="text-xs text-gray-600" key={i}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-3 sm:px-6 gap-x-2">
                    <span className='text-xs font-thin'>HT{id}</span>
                    <div className="min-w-0 flex-1 sm:flex">{submission.track}</div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <span className="mr-2">{convertSecondsToMinutes(submission.duration)}</span>
                      <i className="fa-solid fa-play"></i>
                    </div>
                  </div>
                </a>
              </li>
            ))}
        </ul>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl my-2">Featured On</h1>
      </div>
    </Container>
  );
};
