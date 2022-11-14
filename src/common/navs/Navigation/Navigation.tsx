import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ConnectButton } from '@/common/buttons';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';

const navigation = [
  { name: 'Explore', href: '/explore' },
  { name: 'Tapes', href: '/tapes' },
  { name: 'Collabs', href: '/collab' },
  { name: 'Artists', href: '/artists' },
  { name: 'About', href: '/about' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <Disclosure as="nav" className="lg:pt-10 lg:pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-3">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-baseline">
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
            <Flex alignItems={'baseline'} gap={4} mr={1}>
              <Link className="md:inline hidden relative top-1" to="/">
                <Text fontSize={{ base: 'lg', md: '4xl' }} fontWeight={'bold'} letterSpacing="tight">
                  heds
                </Text>
              </Link>
            </Flex>
            <ul className={`md:inline hidden sticky text-left px-4`}>
              <div
                className={`inline-flex text-sm items-center justify-start navbar-parent text-neutral-400 dark:text-neutral-300 font-semibold tracking-widest`}
              >
                {navigation.map((item, i) => (
                  <div className="" key={item.href + i}>
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
          <div className="flex flex-col items-end sm:-mb-4 -mb-2">
            <ConnectButton />
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
                      {navigation.map((item, i) => (
                        <div key={i} className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-400">
                              <Link to={item.href} onClick={() => setIsOpen(false)}>
                                {item.name}
                              </Link>
                            </Dialog.Title>
                          </div>
                        </div>
                      ))}
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

export default Navigation;
