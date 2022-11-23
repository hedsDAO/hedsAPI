import { Disclosure } from '@headlessui/react';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

const MobileNavDropdown = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transform transition-all ease-in-out duration-500 relative z-10"
      enterFrom="-translate-y-full z-10"
      enterTo="translate-y-0 z-10"
      leave="transform duration-500 transition ease-in-out"
      leaveFrom="opacity-100 rotate-0 scale-100 "
      leaveTo="opacity-0 scale-95 "
    >
      <Disclosure.Panel className="lg:hidden bg-transparent">
        <div className="space-y-1 pt-2 pb-3">{children}</div>
      </Disclosure.Panel>
    </Transition>
  );
};
export default MobileNavDropdown;
