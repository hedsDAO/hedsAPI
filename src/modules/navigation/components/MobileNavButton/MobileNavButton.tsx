import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';

const MobileNavButton = ({ setIsOpen, isOpen }: { setIsOpen: any; isOpen: boolean }) => {
  return (
    <Disclosure.Button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden px-4 py-2 inline-flex items-center justify-center rounded-md text-gray-400 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    >
      <Bars3Icon className={isOpen ? 'block h-8 w-8' : 'block h-8 w-8 rotate-180 transition-all'} aria-hidden="true" />
    </Disclosure.Button>
  );
};

export default MobileNavButton;
