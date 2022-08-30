import React from 'react';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/solid';
import { classNames } from '../../utils/classNames';

const navigation = [
  { name: 'Explore', href: '#', icon: HomeIcon, current: true },
  { name: 'Tapes', href: '#', icon: UsersIcon, current: false },
  { name: 'Artists', href: '#', icon: FolderIcon, current: false },
  { name: 'Vote', href: '#', icon: CalendarIcon, current: false },
  { name: 'Spaces', href: '#', icon: InboxIcon, current: false },
  { name: 'About', href: '#', icon: ChartBarIcon, current: false },
];

export const SidebarDesktop = () => {
  return (
    <div>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-black">
          <div className="flex h-16 flex-shrink-0 items-center bg-black px-4">
            <img
              className="h-10 w-auto"
              src="https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/public%2Fheddot.png?alt=media&token=a1e1d838-5332-4ab6-bb1e-159846efbfd4"
              alt="heds"
            />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
