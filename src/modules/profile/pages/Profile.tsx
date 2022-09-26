import { Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';
import { Container } from '@/common/components/Container';
import { formatTime } from '@utils/formatTime';
import DEFAULT_PROFILE_PICTURE from '/public/default.png';

export const Profile = () => {
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const profileData = useSelector((state: RootState) => state.profileModel);
  const submissions = useSelector((state: RootState) => state.profileModel.submissions?.heds?.hedstape);
  const { wallet } = useParams<{ wallet: string }>();
  useEffect(() => {
    dispatch.profileModel.getProfileData(wallet);
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
    <Fragment>
      <Container>
        <div className="flex">
          <div className="min-w-full aspect-square sm:w-[25%]">
            <img
              src={profileData.profilePicture || DEFAULT_PROFILE_PICTURE}
              alt={profileData.displayName}
              className="object-cover w-full h-full lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem] aspect-square rounded-lg object-center"
            />
            <div className="sm:mt-6 mt-4">
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{profileData.displayName}</h1>
            </div>
            <p className="text-gray-500 text-sm mb-1 px-1">{profileData.description || '...'}</p>
            <a href={`https://www.twitter.com/${profileData?.twitterHandle}`} target="_blank" rel="noreferrer">
              <span className="inline-flex items-center text-xs self-start mt-4 tracking-tight text-neutral-600 px-2.5 py-0.5 rounded-lg transition-all ">
                <i className="fa-brands fa-twitter mr-2 text-[0.65rem]"></i>@{profileData.twitterHandle}
              </span>
            </a>
            <button
              onClick={() => handleCopy()}
              className="inline-flex items-center text-xs self-start mt-4 tracking-tight text-neutral-600  px-2.5 py-0.5 rounded-lg"
            >
              <i className="fa-solid fa-copy mr-2 text-[0.65rem]"></i>
              {profileData?.wallet &&
                profileData.wallet.slice(0, 4) + '...' + profileData.wallet.slice(profileData.wallet.length - 4, profileData.wallet.length)}
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
        </div>
        <div className="min-w-[75%] sm:w-[75%]">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Submissions</h1>
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
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Featured On</h1>
        </div>
      </Container>
    </Fragment>
  );
};
