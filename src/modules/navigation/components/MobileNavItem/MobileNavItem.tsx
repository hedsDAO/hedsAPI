import { Disclosure } from '@headlessui/react';

const MobileNavItem = ({ item }: { item: { href: string; name: string } }) => {
  return (
    <Disclosure.Button
      as="a"
      href={item.href}
      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
    >
      {item.name}
    </Disclosure.Button>
  );
};

export default MobileNavItem;
