import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ConnectButton from '../../../src/common/ConnectButton';
import { classNames } from '../../../src/utils/classNames';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const navigation = [
  { name: 'Explore', href: '/explore' },
  { name: 'Tapes', href: '/tapes' },
  { name: 'Artists', href: '/artists' },
  { name: 'Vote', href: '/vote' },
  { name: 'About', href: '/about' },
];

export const Navigation = () => {
  const { pathname } = useLocation();
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-3">
            <div className="flex h-16 justify-between items-center">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center -mb-1">
                  <Link to="/">
                    <img
                      className="hidden h-8 w-auto lg:block invert"
                      src="https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/public%2Flogo.png?alt=media&token=11a43a45-07cb-4c63-8f6e-d18d77994bf6"
                      alt="heds"
                    />
                  </Link>
                </div>
                <ul className={`md:inline hidden static py-1 text-left px-5`}>
                  <div
                    className={`inline-flex text-sm items-center justify-start navbar-parent text-neutral-400 dark:text-neutral-300 font-semibold tracking-widest`}
                  >
                    {navigation.map((item, i) => (
                      <div key={item.href + i}>
                        {pathname === item.href ? (
                          <li className="current text-gray-600" data-hover={item.name}>
                            <Link to={item.href}>{item.name}</Link>
                          </li>
                        ) : (
                          <li className="" data-hover={item.name}>
                            <Link to={item.href}>{item.name}</Link>
                          </li>
                        )}
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ConnectButton />
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <ul className={`inline md:hidden static py-1 text-left px-5`}>
              <div
                className={`flex flex-col gap-y-1 items-start justify-evenly navbar-parent text-neutral-300 dark:text-neutral-300 font-semibold`}
              >
                {navigation.map((item, i) => (
                  <Disclosure.Button key={item.href + i}>
                    {pathname === item.href ? (
                      <li className="current text-gray-600" data-hover={item.name}>
                        <Link to={item.href}>{item.name}</Link>
                      </li>
                    ) : (
                      <li className="" data-hover={item.name}>
                        <Link to={item.href}>{item.name}</Link>
                      </li>
                    )}
                  </Disclosure.Button>
                ))}
              </div>
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
