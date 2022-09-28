import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ConnectButton } from '@/common/components/buttons/ConnectButton';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';

const navigation = [
  { name: 'Explore', href: '/explore' },
  { name: 'Tapes', href: '/tapes' },
  { name: 'Collabs', href: '/collab' },
  { name: 'Artists', href: '/artists' },
  { name: 'Vote', href: '/vote' },
  { name: 'About', href: '/about' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <Disclosure as="nav" className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-3">
        <div className="flex h-16 justify-between items-center">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <Disclosure.Button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-8 w-8 rotate-180 transition-all" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-shrink-0 items-center -mb-1">
              <Link to="/">
                <img
                  className="hidden h-8 w-auto md:block invert"
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
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="md:hidden relative z-10" onClose={setIsOpen}>
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Panel title</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                        </div>
                        {/* /End replace */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Disclosure>
  );
};
