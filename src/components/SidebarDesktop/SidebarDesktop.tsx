import React from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/solid';
import { classNames } from '../../utils/classNames';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Explore', href: '/explore', icon: HomeIcon, current: true },
  { name: 'Tapes', href: '/tapes', icon: UsersIcon, current: false },
  { name: 'Artists', href: '/artists', icon: FolderIcon, current: false },
  { name: 'Vote', href: '/vote', icon: CalendarIcon, current: false },
  // { name: 'Spaces', href: '/spaces', icon: InboxIcon, current: false },
  { name: 'About', href: '/about', icon: ChartBarIcon, current: false },
];

export const SidebarDesktop = () => {
  const { pathname } = useLocation();
  console.log(pathname)
  return (
    <div>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-52 md:flex-col shadow-sm">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-300">
          <div className="flex h-16 flex-shrink-0 items-center bg-gray-300 px-4">
            <img
              className="h-10 w-auto invert"
              src="https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/public%2Fheddot.png?alt=media&token=a1e1d838-5332-4ab6-bb1e-159846efbfd4"
              alt="heds"
            />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    "/" + item.name.toLowerCase() === pathname
                      ? 'bg-red-400 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-3 py-2 text-sm font-regular font-regular tracking-widest rounded-md shadow-sm transition-all',
                  )}
                >
                  {/* <item.icon
                    className={classNames(
                      item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    )}
                    aria-hidden="true"
                  /> */}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
