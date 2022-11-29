import { Disclosure } from '@headlessui/react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MobileNavItem = ({ item, setIsOpen }: { item: { href: string; name: string }, setIsOpen: Function }) => {
  const { pathname } = useLocation();
  return (
    <Disclosure.Button
      as={Link}
      to={item.href}
      onClick={() => {
        setIsOpen(false);
      }}
      className={`mx-1 block border-l-4 ${
        item.href === pathname ? 'border-gray-500' : 'border-transparent'
      } py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800`}
    >
      {item.name}
    </Disclosure.Button>
  );
};

export default MobileNavItem;
