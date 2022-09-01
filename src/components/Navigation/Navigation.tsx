import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAccount } from 'wagmi';
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ConnectButton from '../../../src/common/ConnectButton';
import Avatar from '../../../src/common/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'src/store';
import { classNames } from '../../utils/classNames';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export const Navigation = () => {
  const { isConnected } = useAccount();
  const profileData = useSelector((state: RootState) => state.profileModel);
  const dispatch = useDispatch<Dispatch>();
  return (
    <div className="flex flex-col md:pl-52">
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0">
        <button
          className="border-r border-gray-400 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => dispatch.layoutModel.setSidebarOpen(true)}
        >
          <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 justify-end gap-x-2 items-center px-2">
          {isConnected && profileData ? <Avatar profileData={profileData} /> : <ConnectButton />}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"></Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
