import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';
import Container from '@/common/Container';
import { Skeleton } from '@chakra-ui/react';
import { DEFAULT_PROFILE_PICTURE } from '@/common/constants/User';

export const User = () => {
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const isUserDataLoading = useSelector((state: RootState) => state.loading.models.userModel);
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
    <Container>
      <div className="flex">
        <div className="min-w-full aspect-square sm:w-[25%]">
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
                <i className="fa-brands fa-twitter mr-2 text-[0.65rem]"></i>@{userData.twitterHandle}
              </span>
            </a>
          </Skeleton>
          <Skeleton fadeDuration={3} isLoaded={!isUserDataLoading}>
            <button
              onClick={() => handleCopy()}
              className="inline-flex items-center text-xs self-start mt-4 tracking-tight text-neutral-600  px-2.5 py-0.5 rounded-lg"
            >
              <i className="fa-solid fa-copy mr-2 text-[0.65rem]"></i>
              {userData?.wallet && userData.wallet.slice(0, 4) + '...' + userData.wallet.slice(userData.wallet.length - 4, userData.wallet.length)}
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
          </Skeleton>
        </div>
      </div>
      <div className="min-w-[75%] sm:w-[75%]">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Submissions</h1>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Featured On</h1>
      </div>
    </Container>
  );
};
